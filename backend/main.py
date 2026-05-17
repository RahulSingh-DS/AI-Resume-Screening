from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.api.routes import router
from app.core.database import Base, engine
from app.models.candidate import Candidate
from app.models.job import Job
from app.models.application import Application

print("Creating database tables...")
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Hiring Platform API",
    version="1.0.0"
)

ALLOWED_ORIGINS = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_DIR = os.path.join(BASE_DIR, "..", "uploads")

os.makedirs(UPLOAD_DIR, exist_ok=True)

app.mount(
    "/uploads",
    StaticFiles(directory=UPLOAD_DIR),
    name="uploads"
)

app.include_router(router)


@app.get("/")
def home():
    return {
        "message": "AI Hiring Platform API Running"
    }