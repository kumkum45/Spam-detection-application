from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
import joblib
from db.database import SessionLocal, engine, Base
from db import models
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from pathlib import Path
from routes import spam_check
from routes.auth import router as auth_router
from routes import reports
from routes import user_activity

# ensure .env
BASE_DIR = Path(__file__).resolve().parent
load_dotenv(dotenv_path=BASE_DIR / ".env")

# Create database tables (no alembic migrations)
Base.metadata.create_all(bind=engine)

# Load trained ML models
SPAM_MODEL_PATH = os.getenv("SPAM_MODEL_PATH", "models/spam_model.pkl")
PHISH_MODEL_PATH = os.getenv("PHISH_MODEL_PATH", "models/phishing_model.pkl")
spam_pipeline = joblib.load(SPAM_MODEL_PATH)
phish_pipeline = joblib.load(PHISH_MODEL_PATH)

# FastAPI app
app = FastAPI(title="Spam & Phishing Detection API")
app.include_router(spam_check.router)
app.include_router(auth_router, prefix="/auth") 
app.include_router(reports.router)  # ✅ this now handles POST /reports + GET /reports/stats
app.include_router(user_activity.router)
# Allow frontend to connect (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rule-based spam keywords
SPAM_KEYWORDS = [
    "free", "win", "congratulations", "urgent",
    "click here", "limited time", "act now",
    "guaranteed", "claim" , "lottery" , "verify account"
]

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Pydantic Schemas ---
class PredictRequest(BaseModel):
    message: str

class PredictResponse(BaseModel):
    is_spam: bool
    spam_confidence: float
    is_phishing: bool
    phishing_confidence: float
    stored: bool

# --- Helper: store results in DB ---
def store_report(db: Session, message, is_spam, spam_conf, is_phishing, phish_conf):
    r = models.SpamReport(
        message=message,
        is_spam=bool(is_spam),
        spam_confidence=float(spam_conf) if spam_conf is not None else None,
        is_phishing=bool(is_phishing),
        phishing_confidence=float(phish_conf) if phish_conf is not None else None,
    )
    db.add(r)
    db.commit()
    db.refresh(r)
    return r

# --- Predict Endpoint ---
@app.post("/predict", response_model=PredictResponse)
def predict(payload: PredictRequest, db: Session = Depends(get_db)):
    print("=== Running predict ===")
    msg = payload.message.strip()
    if not msg:
        raise HTTPException(status_code=400, detail="message is required")

    # 1) Check if message exists in DB
    existing = (
        db.query(models.SpamReport)
        .filter(models.SpamReport.message == msg)
        .order_by(models.SpamReport.created_at.desc())
        .first()
    )
    if existing:
        return PredictResponse(
            is_spam=existing.is_spam,
            spam_confidence=existing.spam_confidence or 0.0,
            is_phishing=existing.is_phishing,
            phishing_confidence=existing.phishing_confidence or 0.0,
            stored=True,
        )

    msg_lower = msg.lower()

    # 2) Quick rule-based spam check
    try:
        spam_proba = float(spam_pipeline.predict_proba([msg])[0][1])
    except Exception:
        spam_proba = 0.0

    if any(k in msg_lower for k in SPAM_KEYWORDS) or spam_proba > 0.6:
        store_report(db, msg, True, spam_proba, False, 0.0)
        return PredictResponse(
            is_spam=True,
            spam_confidence=spam_proba,
            is_phishing=False,
            phishing_confidence=0.0,
            stored=True,
        )

    # 3) Phishing check
    try:
        phish_proba = float(phish_pipeline.predict_proba([msg])[0][1])
    except Exception:
        phish_proba = 0.0

    if phish_proba > 0.3:
        store_report(db, msg, False, spam_proba, True, phish_proba)
        return PredictResponse(
            is_spam=False,
            spam_confidence=spam_proba,
            is_phishing=True,
            phishing_confidence=phish_proba,
            stored=True,
        )

    # 4) Neither spam nor phishing
    store_report(db, msg, False, spam_proba, False, phish_proba)
    return PredictResponse(
        is_spam=False,
        spam_confidence=spam_proba,
        is_phishing=False,
        phishing_confidence=phish_proba,
        stored=False,
    )

@app.get("/")
def home():
    return {"message": "API up"}
