from fastapi import APIRouter, UploadFile, File, Form, Depends
from sqlalchemy.orm import Session
import os
import shutil

from app.services.parser_service import parse_pdf, parse_docx
from app.services.matching_service import analyze_resume
from app.services.llm_service import generate_feedback
from app.models.candidate import Candidate
from app.core.database import get_db

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/analyze")
async def analyze(
    resume: UploadFile = File(...),
    job_description: str = Form(...),
    db: Session = Depends(get_db)
):
    file_path = os.path.join(UPLOAD_DIR, resume.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(resume.file, buffer)

    if resume.filename.endswith(".pdf"):
        resume_text = parse_pdf(file_path)

    elif resume.filename.endswith(".docx"):
        resume_text = parse_docx(file_path)

    else:
        return {"error": "Unsupported file format"}

    analysis = analyze_resume(resume_text, job_description)

    match_score = float(analysis["match_score"])

    feedback = generate_feedback(
        resume_text,
        job_description,
        match_score,
        analysis["matched_skills"],
        analysis["missing_skills"]
    )

    candidate = Candidate(
        filename=resume.filename,
        match_score=match_score,
        matched_skills=", ".join(analysis["matched_skills"]),
        missing_skills=", ".join(analysis["missing_skills"]),
        feedback=feedback,
    )

    db.add(candidate)
    db.commit()
    db.refresh(candidate)

    return {
        "id": candidate.id,
        "filename": resume.filename,
        "match_score": match_score,
        "matched_skills": analysis["matched_skills"],
        "missing_skills": analysis["missing_skills"],
        "feedback": feedback,
        "status": candidate.status
    }


@router.get("/candidates")
def get_candidates(db: Session = Depends(get_db)):
    candidates = db.query(Candidate).all()

    return [
        {
            "id": candidate.id,
            "filename": candidate.filename,
            "match_score": candidate.match_score,
            "matched_skills": candidate.matched_skills,
            "missing_skills": candidate.missing_skills,
            "feedback": candidate.feedback,
            "status": candidate.status,
            "created_at": candidate.created_at
        }
        for candidate in candidates
    ]


@router.post("/candidate/{candidate_id}/shortlist")
def shortlist(candidate_id: int, db: Session = Depends(get_db)):
    candidate = db.query(Candidate).filter(
        Candidate.id == candidate_id
    ).first()

    if not candidate:
        return {"error": "Candidate not found"}

    candidate.status = "shortlisted"
    db.commit()

    return {"message": "Candidate shortlisted"}


@router.post("/candidate/{candidate_id}/reject")
def reject(candidate_id: int, db: Session = Depends(get_db)):
    candidate = db.query(Candidate).filter(
        Candidate.id == candidate_id
    ).first()

    if not candidate:
        return {"error": "Candidate not found"}

    candidate.status = "rejected"
    db.commit()

    return {"message": "Candidate rejected"}