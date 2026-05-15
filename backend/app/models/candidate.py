from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from sqlalchemy.sql import func
from app.core.database import Base


class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(Integer, primary_key=True, index=True)

    recruiter_id = Column(String, nullable=False)

    filename = Column(String, nullable=False)
    email = Column(String, nullable=False)

    match_score = Column(Float)
    matched_skills = Column(Text)
    missing_skills = Column(Text)
    feedback = Column(Text)

    status = Column(String, default="pending")
    created_at = Column(DateTime(timezone=True), server_default=func.now())