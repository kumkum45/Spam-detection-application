from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey
from db.database import Base
from datetime import datetime
from sqlalchemy.orm import relationship

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    message = Column(String, unique=True, index=True, nullable=False)
    is_spam = Column(Boolean, default=False)
    spam_confidence = Column(Float, default=0.0)
    is_phishing = Column(Boolean, default=False)
    phishing_confidence = Column(Float, default=0.0)
    created_at = Column(String, default=lambda: datetime.utcnow().isoformat())
    user = relationship("User", back_populates="messages")
