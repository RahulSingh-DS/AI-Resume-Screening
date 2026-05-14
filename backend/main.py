from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.api.routes import router
from app.core.database import Base, engine
from app.models.candidate import Candidate

print("Creating database tables...")
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Resume Screening Bot API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_DIR = os.path.join(BASE_DIR, "..", "uploads")
print("UPLOAD DIR:", os.path.abspath(UPLOAD_DIR))
print("FILES:", os.listdir(os.path.abspath(UPLOAD_DIR)))

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

app.include_router(router)


@app.get("/")
def home():
    return {"message": "Resume Screening Bot API Running"}