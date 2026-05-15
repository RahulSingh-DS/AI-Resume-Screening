from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from app.core.database import Base


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)

    recruiter_id = Column(String, nullable=False)

    title = Column(String, nullable=False)
    company = Column(String, nullable=False)
    location = Column(String, nullable=False)
    salary = Column(String, nullable=True)

    description = Column(Text, nullable=False)
    required_skills = Column(Text, nullable=True)

    status = Column(String, default="open")

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )