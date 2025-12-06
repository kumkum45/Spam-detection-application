# db/models.py
from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, Float, func, ForeignKey , DateTime
from .database import Base
from sqlalchemy.orm import relationship
from datetime import datetime

class SpamReport(Base):
    __tablename__ = "spam_reports"

    id = Column(Integer, primary_key=True, index=True)
    message = Column(Text, nullable=False)
    is_spam = Column(Boolean, default=False)
    spam_confidence = Column(Float, nullable=True)
    is_phishing = Column(Boolean, default=False)
    phishing_confidence = Column(Float, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class SpamMessage(Base):
    __tablename__ = "spam_messages"

    id = Column(Integer, primary_key=True, index=True)
    message = Column(Text, nullable=False)
    label = Column(String, nullable=False)  # "spam" or "ham"
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class PhishingLog(Base):
    __tablename__ = "phishing_logs"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(Text, nullable=False)
    label = Column(String, nullable=False)  # "phishing" or "legit"
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    message = Column(String, nullable=False)
    category = Column(String, nullable=False)
    status = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)
    source = Column(String, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"),nullable=False)
    user = relationship("User", back_populates="reports")  # <-- this line causes error


# db/models.py
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from datetime import datetime
from db.database import Base

class Sender(Base):
    __tablename__ = "senders"
    id = Column(Integer, primary_key=True, index=True)
    sender_id = Column(String, unique=True, index=True, nullable=False)  # कोई unique पहचान जैसे email/phone/IP
    is_blocked = Column(Boolean, default=False)
    blocked_reason = Column(Text, nullable=True)
    blocked_at = Column(DateTime, nullable=True)
