# schemas/reports_schema.py
from pydantic import BaseModel
from datetime import datetime
from typing import List

class ReportBase(BaseModel):
    message: str
    category: str
    source: str
    user_id: int 

class ReportCreate(ReportBase):
    pass

class ReportResponse(ReportBase):
    id: int
    message: str
    category: str
    source: str | None
    status: str
    created_at: datetime
    user_id: int # ✅ THIS is required for Pydantic v2

class ReportStats(BaseModel):
    reports_submitted: int
    verified_spam: int
    false_positives: int
    accuracy_rate: float
    recent_reports: List[ReportResponse]
