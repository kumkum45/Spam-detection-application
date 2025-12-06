# routes/spam_check.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pathlib import Path
import joblib
from db.models import Sender
from db.database import get_db
from models.message import Message
from models.user import User
from schemas.spam_schemas import SpamMessageCreate, SpamMessageResponse
from auth.jwt import decode_access_token
from fastapi.security import OAuth2PasswordBearer
from models.phishing_detector import is_phishing_message
from datetime import datetime
# ---------------- Router ----------------
router = APIRouter(tags=["Spam Check"])

# ---------------- OAuth2 ----------------
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")


# ---------------- Load Spam Model & Vectorizer ----------------
spam_model_path = Path("models/spam_model.pkl")
spam_vectorizer_path = Path("models/vectorizer.pkl")

if not spam_model_path.exists() or not spam_vectorizer_path.exists():
    raise RuntimeError("Spam model or vectorizer not found. Please run train_models.py.")

spam_model = joblib.load(spam_model_path)
spam_vectorizer = joblib.load(spam_vectorizer_path)


# ---------------- Helper: Get Current User ----------------
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    try:
        payload = decode_access_token(token)
        user = db.query(User).filter(User.id == payload.get("user_id")).first()
        if not user:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user
    except Exception:
        raise HTTPException(status_code=401, detail="Could not validate credentials")


# ---------------- Spam Check Endpoint ----------------
@router.post("/spam-check", response_model=SpamMessageResponse)
def check_spam(
    payload: SpamMessageCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    text = payload.message.strip()
    if not text:
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    # ---------------- Check Existing Message ----------------
    existing_msg = db.query(Message).filter(
        Message.message == text,
        Message.user_id == current_user.id
    ).first()

    if existing_msg:
        return SpamMessageResponse(
            is_spam=existing_msg.is_spam,
            spam_confidence=existing_msg.spam_confidence or 0.0,
            is_phishing=existing_msg.is_phishing,
            phishing_confidence=existing_msg.phishing_confidence or 0.0,
            stored=True
        )

    # ---------------- Predict Spam ----------------
    X_spam = spam_vectorizer.transform([text])
    spam_pred = spam_model.predict(X_spam)[0]
    spam_proba = spam_model.predict_proba(X_spam)[0]
    is_spam = bool(spam_pred)
    spam_confidence = float(spam_proba[1])

    # ---------------- Predict Phishing ----------------
    is_phishing, phishing_confidence = is_phishing_message(text)

    # ---------------- Save Message ----------------
    new_msg = Message(
        message=text,
        user_id=current_user.id,
        is_spam=is_spam,
        spam_confidence=spam_confidence,
        is_phishing=is_phishing,
        phishing_confidence=phishing_confidence
    )
    db.add(new_msg)
    db.commit()
    db.refresh(new_msg)

    return SpamMessageResponse(
        is_spam=is_spam,
        spam_confidence=spam_confidence,
        is_phishing=is_phishing,
        phishing_confidence=phishing_confidence,
        stored=True
    )




BLOCK_THRESHOLD = 0.80  # threshold for blocking

@router.post("/spam-check", response_model=SpamMessageResponse)
def check_spam(payload: SpamMessageCreate, db: Session = Depends(get_db)):
    text = payload.message.strip()

    # === Existing spam + phishing detection ===
    is_spam, spam_confidence = is_spam_message(text)
    is_phishing, phishing_confidence = is_phishing_message(text)

    # === Fetch sender (or create new if first time) ===
    sender = db.query(Sender).filter(Sender.sender_id == payload.sender_id).first()
    if not sender:
        sender = Sender(sender_id=payload.sender_id)
        db.add(sender)
        db.commit()
        db.refresh(sender)

    # === Blocking Logic ===
    if (spam_confidence >= BLOCK_THRESHOLD or phishing_confidence >= BLOCK_THRESHOLD):
        if not sender.is_blocked:
            sender.is_blocked = True
            sender.blocked_reason = (
                "High spam confidence"
                if spam_confidence >= BLOCK_THRESHOLD
                else "Phishing attempt detected"
            )
            sender.blocked_at = datetime.utcnow()
            db.commit()
            print(f"[INFO] Sender {sender.sender_id} BLOCKED.")

    # === Return Response ===
    return {
        "is_spam": is_spam,
        "spam_confidence": spam_confidence,
        "is_phishing": is_phishing,
        "phishing_confidence": phishing_confidence,
        "sender_blocked": sender.is_blocked,   # extra info for frontend
        "blocked_reason": sender.blocked_reason,
        "stored": True,
    }
    