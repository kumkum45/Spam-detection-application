# schemas.py
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# -------------------------
# SPAM MESSAGE SCHEMAS
# -------------------------
class SpamMessageBase(BaseModel):
    message: str

    class Config:
        from_attributes = True  # Pydantic v2 equivalent of orm_mode


class SpamMessageCreate(SpamMessageBase):
    pass


class SpamMessageResponse(BaseModel):
    is_spam: bool
    spam_confidence: float
    is_phishing: bool
    phishing_confidence: float
    stored: bool
    sender_blocked: Optional[bool] = False
    blocked_reason: Optional[str] = None


# -------------------------
# PHISHING LOG SCHEMAS (if you log user checks)
# -------------------------
class PhishingLogBase(BaseModel):
    url: str
    is_phish: bool

    class Config:
        from_attributes = True


class PhishingLogCreate(PhishingLogBase):
    pass


class PhishingLogResponse(PhishingLogBase):
    id: int
    created_at: datetime
