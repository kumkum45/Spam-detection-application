from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime

from db.database import get_db
from db.models import Report
from schemas.reports_schema import ReportCreate, ReportResponse, ReportStats

router = APIRouter(
    prefix="/reports",
    tags=["reports"]
)

@router.post("/", response_model=ReportResponse)
def create_report(report_data: ReportCreate, db: Session = Depends(get_db)):
    new_report = Report(
        message=report_data.message,
        category=report_data.category,
        source=report_data.source,
        status="Reported",
        created_at=datetime.utcnow(), 
        user_id=report_data.user_id,
    )
    db.add(new_report)
    db.commit()
    db.refresh(new_report)
    return ReportResponse.model_validate(new_report, from_attributes=True)

@router.get("/stats", response_model=ReportStats)
def get_report_stats(db: Session = Depends(get_db)):
    reports_submitted = db.query(Report).count()
    verified_spam = db.query(Report).filter(Report.status == "Verified").count()
    false_positives = db.query(Report).filter(Report.status == "False Positive").count()

    accuracy_rate = (verified_spam / reports_submitted) * 100 if reports_submitted > 0 else 0.0

    recent_reports = (
        db.query(Report)
        .order_by(Report.created_at.desc())
        .limit(5)
        .all()
    )

    recent_reports_schema = [
        ReportResponse.model_validate(r, from_attributes=True) for r in recent_reports
    ]

    return ReportStats(
        reports_submitted=reports_submitted,
        verified_spam=verified_spam,
        false_positives=false_positives,
        accuracy_rate=round(accuracy_rate, 1),
        recent_reports=recent_reports_schema,
    )
