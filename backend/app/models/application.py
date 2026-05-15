from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from app.core.database import Base


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)

    job_id = Column(Integer, nullable=False)

    candidate_user_id = Column(String, nullable=False)
    candidate_email = Column(String, nullable=False)

    resume_filename = Column(String, nullable=False)

    match_score = Column(Float, nullable=False)

    status = Column(String, default="applied")

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )