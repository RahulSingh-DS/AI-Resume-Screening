from app.models.job import Job
from app.models.candidate import Candidate
from app.models.application import Application

from fastapi import APIRouter, UploadFile, File, Form, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
import os
import shutil

from app.services.parser_service import parse_pdf, parse_docx
from app.services.matching_service import analyze_resume
from app.services.llm_service import generate_feedback
from app.services.email_service import (
    send_shortlist_email,
    send_rejection_email,
)
from app.models.candidate import Candidate
from app.core.database import get_db

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/analyze")
async def analyze(
    resume: UploadFile = File(...),
    job_description: str = Form(...),
    candidate_email: str = Form(...),
    recruiter_id: str = Form(...),
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
        recruiter_id=recruiter_id,
        filename=resume.filename,
        email=candidate_email,
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
        "filename": candidate.filename,
        "email": candidate.email,
        "match_score": candidate.match_score,
        "matched_skills": analysis["matched_skills"],
        "missing_skills": analysis["missing_skills"],
        "feedback": candidate.feedback,
        "status": candidate.status
    }


@router.get("/candidates")
def get_candidates(
    recruiter_id: str,
    db: Session = Depends(get_db)
):
    candidates = db.query(Candidate).filter(
        Candidate.recruiter_id == recruiter_id
    ).all()

    return [
        {
            "id": candidate.id,
            "filename": candidate.filename,
            "email": candidate.email,
            "match_score": candidate.match_score,
            "matched_skills": candidate.matched_skills,
            "missing_skills": candidate.missing_skills,
            "feedback": candidate.feedback,
            "status": candidate.status,
            "created_at": candidate.created_at
        }
        for candidate in candidates
    ]


@router.get("/candidate/{candidate_id}")
def get_candidate(
    candidate_id: int,
    recruiter_id: str,
    db: Session = Depends(get_db)
):
    candidate = db.query(Candidate).filter(
        Candidate.id == candidate_id,
        Candidate.recruiter_id == recruiter_id
    ).first()

    if not candidate:
        return {"error": "Candidate not found or unauthorized"}

    return {
        "id": candidate.id,
        "filename": candidate.filename,
        "email": candidate.email,
        "match_score": candidate.match_score,
        "matched_skills": candidate.matched_skills,
        "missing_skills": candidate.missing_skills,
        "feedback": candidate.feedback,
        "status": candidate.status,
        "created_at": candidate.created_at
    }


@router.get("/resume/{filename}")
def get_resume(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)

    if not os.path.exists(file_path):
        return {"error": "Resume not found"}

    return FileResponse(file_path)


@router.post("/candidate/{candidate_id}/shortlist")
def shortlist(
    candidate_id: int,
    recruiter_id: str,
    db: Session = Depends(get_db)
):
    candidate = db.query(Candidate).filter(
        Candidate.id == candidate_id,
        Candidate.recruiter_id == recruiter_id
    ).first()

    if not candidate:
        return {"error": "Candidate not found or unauthorized"}

    candidate.status = "shortlisted"
    db.commit()

    send_shortlist_email(candidate.email, candidate.filename)

    return {"message": "Candidate shortlisted and email sent"}


@router.post("/candidate/{candidate_id}/reject")
def reject(
    candidate_id: int,
    recruiter_id: str,
    db: Session = Depends(get_db)
):
    candidate = db.query(Candidate).filter(
        Candidate.id == candidate_id,
        Candidate.recruiter_id == recruiter_id
    ).first()

    if not candidate:
        return {"error": "Candidate not found or unauthorized"}

    candidate.status = "rejected"
    db.commit()

    send_rejection_email(candidate.email, candidate.filename)

    return {"message": "Candidate rejected and email sent"}

@router.post("/jobs")
def create_job(
    recruiter_id: str = Form(...),
    title: str = Form(...),
    company: str = Form(...),
    location: str = Form(...),
    salary: str = Form(""),
    description: str = Form(...),
    required_skills: str = Form(""),
    db: Session = Depends(get_db)
):
    job = Job(
        recruiter_id=recruiter_id,
        title=title,
        company=company,
        location=location,
        salary=salary,
        description=description,
        required_skills=required_skills,
    )

    db.add(job)
    db.commit()
    db.refresh(job)

    return {
        "id": job.id,
        "message": "Job created successfully"
    }


@router.get("/jobs")
def get_public_jobs(db: Session = Depends(get_db)):
    jobs = db.query(Job).filter(
        Job.status == "open"
    ).order_by(Job.created_at.desc()).all()

    return [
        {
            "id": job.id,
            "title": job.title,
            "company": job.company,
            "location": job.location,
            "salary": job.salary,
            "required_skills": job.required_skills,
            "status": job.status,
            "created_at": job.created_at
        }
        for job in jobs
    ]


@router.get("/recruiter/jobs")
def get_recruiter_jobs(
    recruiter_id: str,
    db: Session = Depends(get_db)
):
    jobs = db.query(Job).filter(
        Job.recruiter_id == recruiter_id
    ).order_by(Job.created_at.desc()).all()

    return [
        {
            "id": job.id,
            "title": job.title,
            "company": job.company,
            "location": job.location,
            "salary": job.salary,
            "description": job.description,
            "required_skills": job.required_skills,
            "status": job.status,
            "created_at": job.created_at
        }
        for job in jobs
    ]


@router.get("/jobs/{job_id}")
def get_job_detail(
    job_id: int,
    db: Session = Depends(get_db)
):
    job = db.query(Job).filter(
        Job.id == job_id
    ).first()

    if not job:
        return {"error": "Job not found"}

    return {
        "id": job.id,
        "title": job.title,
        "company": job.company,
        "location": job.location,
        "salary": job.salary,
        "description": job.description,
        "required_skills": job.required_skills,
        "status": job.status,
        "created_at": job.created_at
    }

@router.post("/jobs/{job_id}/apply")
async def apply_to_job(
    job_id: int,
    resume: UploadFile = File(...),
    candidate_user_id: str = Form(...),
    candidate_email: str = Form(...),
    db: Session = Depends(get_db)
):
    job = db.query(Job).filter(
        Job.id == job_id
    ).first()

    if not job:
        return {"error": "Job not found"}

    file_path = os.path.join(
        UPLOAD_DIR,
        resume.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(resume.file, buffer)

    if resume.filename.endswith(".pdf"):
        resume_text = parse_pdf(file_path)

    elif resume.filename.endswith(".docx"):
        resume_text = parse_docx(file_path)

    else:
        return {"error": "Unsupported file format"}

    analysis = analyze_resume(
        resume_text,
        job.description + " " + (job.required_skills or "")
    )

    application = Application(
        job_id=job.id,
        candidate_user_id=candidate_user_id,
        candidate_email=candidate_email,
        resume_filename=resume.filename,
        match_score=float(analysis["match_score"]),
    )

    db.add(application)
    db.commit()
    db.refresh(application)

    return {
        "message": "Application submitted successfully",
        "match_score": application.match_score,
        "application_id": application.id,
    }


@router.get("/jobs/{job_id}/applications")
def get_job_applications(
    job_id: int,
    db: Session = Depends(get_db)
):
    applications = db.query(Application).filter(
        Application.job_id == job_id
    ).order_by(Application.created_at.desc()).all()

    return [
        {
            "id": app.id,
            "candidate_email": app.candidate_email,
            "resume_filename": app.resume_filename,
            "match_score": app.match_score,
            "status": app.status,
            "created_at": app.created_at,
        }
        for app in applications
    ]