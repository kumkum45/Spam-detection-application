from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from db.database import get_db
from models.message import Message  # ✅ Use Message table

router = APIRouter(
    prefix="/user",
    tags=["user"]
)

@router.get("/activity")
def get_user_activity(user_id: int = Query(...), db: Session = Depends(get_db)):
    print(f"🔍 DEBUG: Received user_id = {user_id}")  # ✅ ADDED for debugging

    user_messages = db.query(Message).filter(Message.user_id == user_id).all()
    print(f"🔍 DEBUG: Found {len(user_messages)} messages for this user")

    total_scans = len(user_messages)
    spam_detected = len([m for m in user_messages if m.is_spam or m.is_phishing])
    safe_messages = len([m for m in user_messages if not m.is_spam and not m.is_phishing])
    accuracy = round((spam_detected / total_scans) * 100, 2) if total_scans > 0 else 0.0

    recent_activity = [
        {
            "message": m.message,
            "status": "spam" if m.is_spam else "phishing" if m.is_phishing else "safe",
            "time": m.created_at
        }
        for m in sorted(user_messages, key=lambda x: x.created_at, reverse=True)[:5]
    ]

    return {
        "total_scans": total_scans,
        "spam_detected": spam_detected,
        "safe_messages": safe_messages,
        "accuracy": accuracy,
        "recent_activity": recent_activity,
    }
