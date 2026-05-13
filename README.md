# 🚀 AI Resume Screening

<div align="center">

### Intelligent AI-Powered Resume Screening & Candidate Management Platform

Automate resume analysis, ATS scoring, skill matching, recruiter feedback generation, and candidate decision workflows using **NLP + LLMs + FastAPI + Next.js**.

<br/>

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green?logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.11+-blue?logo=python)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue?logo=postgresql)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-UI-38B2AC?logo=tailwind-css)
![Groq](https://img.shields.io/badge/Groq-LLM-orange)
![License](https://img.shields.io/badge/License-MIT-purple)

</div>

---

## 🌟 Overview

**AI Resume Screening** is a full-stack AI recruitment platform designed to automate the early stages of hiring.

Recruiters can:

✅ Upload resumes (PDF / DOCX)  
✅ Paste job descriptions  
✅ Get ATS-style match scores  
✅ Identify matched and missing skills  
✅ Receive AI recruiter feedback  
✅ Shortlist / reject candidates  
✅ Track applicants through an HR dashboard  

This project combines **Natural Language Processing (NLP)**, **semantic similarity scoring**, and **Large Language Models (LLMs)** to simulate intelligent recruiter decision-making.

---

## 🎯 Key Highlights

- Hybrid ATS scoring using **TF-IDF + Sentence Embeddings**
- AI recruiter analysis powered by **Groq LLM**
- Resume parsing for **PDF and DOCX**
- Persistent cloud database using **Neon PostgreSQL**
- Modern recruiter dashboard built with **Next.js + Tailwind + shadcn/ui**
- Fast and scalable API backend using **FastAPI**
- Production-ready architecture with deployment support

---

## 🖼 Preview

> Add screenshots here later

Example:

```markdown
![Home Page](screenshots/home.png)
![Dashboard](screenshots/dashboard.png)
```

# ❗ Problem Statement

Modern hiring teams spend a significant amount of time manually reviewing resumes, comparing candidate profiles against job requirements, and deciding whether applicants should move forward in the recruitment pipeline.

This manual process creates several challenges:

- Slow hiring decisions
- Inconsistent candidate evaluation
- Human bias in resume screening
- Missed qualified applicants
- Difficulty handling large application volumes
- Lack of structured feedback for hiring decisions

Traditional ATS (Applicant Tracking Systems) often rely only on keyword matching, which can fail to understand semantic relevance, project experience, or contextual skill alignment.

For example:

A candidate may mention:

- *“Built machine learning prediction systems using Scikit-learn”*

while the job description asks for:

- *“Experience in predictive modeling and machine learning.”*

A basic keyword-based ATS may fail to understand that both are highly related.

This creates false negatives and poor hiring outcomes.

---

# 💡 Solution

**AI Resume Screening** solves this by combining NLP, semantic embeddings, and LLM reasoning to create a smarter resume screening workflow.

Instead of relying only on static keyword matching, the platform:

- extracts resume text
- parses candidate information
- compares job descriptions semantically
- identifies skill overlap
- calculates ATS-style relevance scores
- generates recruiter-style AI feedback
- stores candidate evaluations
- supports hiring decisions through dashboard workflows

This creates a more intelligent and scalable screening pipeline.

---

# 🌍 Real-World Use Cases

This platform can be used by:

### Recruitment Teams
Automate first-round resume filtering.

### Startups
Quickly evaluate large candidate pools without manual effort.

### HR Departments
Track candidate decisions in a centralized dashboard.

### Hiring Managers
Get structured AI-generated insights before interviews.

### Staffing Agencies
Screen candidates faster for multiple client openings.

### EdTech / Career Platforms
Provide ATS scoring and resume improvement feedback to users.

---

# 🎯 Project Objectives

The primary goals of this project are:

- Build an AI-powered ATS screening engine
- Implement semantic resume-job matching
- Automate recruiter feedback generation
- Provide a modern HR dashboard experience
- Store candidate records persistently
- Create a scalable full-stack architecture
- Make the platform deployment-ready

---

# 🔍 Core Workflow

The system follows this pipeline:

```text
Recruiter uploads resume
        ↓
Resume parsing (PDF/DOCX)
        ↓
Text extraction
        ↓
Job description input
        ↓
TF-IDF similarity analysis
        ↓
Sentence embedding similarity
        ↓
Skill overlap detection
        ↓
ATS score generation
        ↓
LLM recruiter feedback generation
        ↓
Save candidate in PostgreSQL
        ↓
HR dashboard management
        ↓
Shortlist / Reject decision
```

---

# 🧠 AI Components Used

The intelligence layer combines multiple techniques:

### NLP Parsing
Used for:
- text cleaning
- normalization
- preprocessing

Libraries:
- spaCy
- regex
- string processing

---

### ATS Matching Engine
Used for:
- keyword relevance
- document similarity
- scoring

Libraries:
- scikit-learn
- TF-IDF vectorizer

---

### Semantic Similarity
Used for:
- contextual skill understanding
- semantic JD matching

Libraries:
- sentence-transformers
- PyTorch

---

### LLM Recruiter Analysis
Used for:
- candidate evaluation
- strengths/weaknesses
- hiring recommendations
- interview questions

Provider:
- Groq API

Model:
- Llama 3.3 70B

---

# 🚀 Why This Project Matters

This project demonstrates full-stack AI engineering skills:

✅ NLP engineering  
✅ LLM prompt engineering  
✅ FastAPI backend development  
✅ Next.js frontend engineering  
✅ database integration  
✅ recruiter workflow automation  
✅ production architecture thinking  
✅ cloud deployment readiness  

It is both a practical hiring tool and a strong AI portfolio project.
---
# ✨ Features

AI Resume Screening combines AI, NLP, LLMs, and recruiter workflow automation into a complete hiring assistance platform.

---

# ✅ Current Features

## 📄 Resume Upload & Parsing

Supports resume uploads in multiple formats:

- PDF resumes
- DOCX resumes

The system automatically extracts readable candidate text for downstream analysis.

### Parsing Libraries Used
- pdfplumber
- python-docx
- PyMuPDF

### Capabilities
- resume text extraction
- document content normalization
- parser pipeline integration

---

## 🧠 AI-Powered ATS Match Scoring

The platform evaluates how well a resume matches a job description.

Unlike simple keyword-only ATS systems, this uses a hybrid scoring engine.

### Scoring Components
- TF-IDF similarity matching
- sentence embedding similarity
- keyword overlap analysis
- semantic skill relevance

### Returns
- ATS match percentage
- candidate relevance score
- contextual job fit estimation

Example:

```text
ATS Match Score: 82.4%
```

---

## 🎯 Skill Matching Analysis

The system automatically detects:

### Matched Skills
Skills found in both:
- resume
- job description

Example:

```text
Python
SQL
TensorFlow
FastAPI
NLP
Scikit-learn
```

---

### Missing Skills
Skills required by the job but absent from the resume.

Example:

```text
Docker
AWS
PyTorch
Tableau
Power BI
```

This helps recruiters and candidates quickly identify fit gaps.

---

## 🤖 AI Recruiter Feedback Generation

Uses LLM reasoning to simulate recruiter decision-making.

Powered by:

- Groq API
- Llama 3.3 70B

AI feedback includes:

### Candidate Summary
High-level profile overview.

Example:

```text
Strong data science fresher with project experience in machine learning and NLP.
```

---

### Strengths Analysis
Identifies candidate strengths such as:

- technical skills
- project alignment
- relevant frameworks
- experience fit

---

### Weakness Analysis
Identifies missing or weaker areas.

Example:

- cloud deployment exposure
- deep learning gaps
- visualization tooling gaps

---

### Hiring Recommendation
AI suggests:

```text
Shortlist
OR
Reject
```

---

### Interview Questions
Generates tailored recruiter questions.

Example:

```text
How would you optimize a machine learning model for imbalanced data?
```

---

## 🗄 Candidate Persistence

Every analysis is stored in cloud PostgreSQL.

Stored data includes:

- filename
- ATS score
- matched skills
- missing skills
- AI recruiter feedback
- hiring status
- timestamps

Database:
- PostgreSQL
- Neon cloud hosting

---

## 📊 HR Dashboard

Recruiter control center for candidate management.

Current dashboard includes:

### Candidate Listing
View all analyzed candidates.

---

### ATS Score Visualization
Progress-based score display.

Example:

```text
██████████ 82%
```

---

### Status Tracking
Track candidate state:

- Pending
- Shortlisted
- Rejected

---

### Search
Search candidates by filename.

---

### Filtering
Filter candidates by:

- all
- pending
- shortlisted
- rejected

---

### Analytics Cards
Dashboard stats:

- Total Candidates
- Shortlisted
- Rejected
- Pending

---

### Feedback Modal
View detailed AI recruiter analysis in popup modal.

---

## ⚡ Shortlist / Reject Workflow

Recruiters can take direct actions:

### Shortlist
Moves candidate to:

```text
shortlisted
```

---

### Reject
Moves candidate to:

```text
rejected
```

Updates are persisted in PostgreSQL.

---

## 🎨 Modern Frontend UI

Frontend built using:

- Next.js
- React
- Tailwind CSS
- shadcn/ui
- Lucide icons

UI highlights:

- dark modern recruiter theme
- responsive layout
- clean analytics cards
- modal interactions
- recruiter dashboard UX

---

## 🚀 Fast API Backend

Backend built with FastAPI.

Benefits:

- async support
- automatic OpenAPI docs
- scalable architecture
- production-ready APIs

API docs available at:

```text
http://localhost:8000/docs
```

---

## ☁ Cloud Database Integration

Persistent candidate storage using:

- Neon PostgreSQL

Benefits:

- cloud-hosted
- scalable
- production-friendly
- secure connection support

---

# 🔮 Planned Features (Roadmap)

These are upcoming enhancements.

---

## 🔐 Authentication & Authorization

Planned integration:

- Clerk authentication

Features:

- sign up
- sign in
- logout
- protected routes
- recruiter-only dashboard

---

## 📧 Email Notifications

---
# 🛠 Tech Stack

AI Resume Screening is built using a modern full-stack AI engineering architecture.

The stack was selected for:

- performance
- developer productivity
- scalability
- AI integration flexibility
- production deployment readiness

---

# 🎨 Frontend Stack

The frontend is responsible for:

- recruiter UI
- resume upload experience
- ATS result visualization
- HR dashboard interactions
- candidate workflow management

---

## Next.js

Frontend framework:

```text
Next.js 16
```

Why used:

- App Router architecture
- server/client rendering flexibility
- production optimization
- clean routing system
- excellent React ecosystem support

Use cases:

- homepage
- dashboard
- future auth pages
- protected routes
- recruiter portal

---

## React

Core frontend UI library.

Why used:

- component-based architecture
- reusable UI components
- state management
- event handling
- scalable frontend engineering

Used for:

- ATS analyzer UI
- dashboard rendering
- filters
- modal interactions
- search functionality

---

## TypeScript

Used for frontend type safety.

Why:

- prevents runtime bugs
- cleaner API integration
- safer component development
- better maintainability

Example:

```ts
type Candidate = {
  id: number;
  filename: string;
  match_score: number;
  feedback: string;
  status: string;
};
```

---

## Tailwind CSS

Utility-first CSS framework.

Why:

- rapid UI development
- responsive design
- clean styling workflow
- dark theme support

Used for:

- dashboard styling
- layouts
- spacing
- responsiveness
- recruiter UI polish

---

## shadcn/ui

Modern UI component library.

Why:

- beautiful accessible components
- production-ready design
- excellent Tailwind integration
- premium SaaS aesthetic

Components used:

- Button
- Card
- Dialog
- Badge
- Progress
- Input
- Textarea
- Table
- Tabs

---

## Lucide React

Icon library.

Why:

- lightweight
- modern icons
- React-friendly

Used for:

- dashboard analytics icons
- action indicators
- UI enhancement

---

## Axios

HTTP client.

Why:

- easy REST API calls
- cleaner syntax
- request handling
- async integration

Used for:

- analyze requests
- fetch candidates
- shortlist actions
- reject actions

---

# ⚙ Backend Stack

The backend handles:

- API endpoints
- resume processing
- AI orchestration
- database interactions
- recruiter workflow logic

---

## Python

Backend language:

```text
Python 3.11+
```

Why:

- AI ecosystem dominance
- NLP tooling
- rapid backend development
- rich package ecosystem

Perfect for:

- FastAPI
- NLP
- ML
- parsing
- LLM integrations

---

## FastAPI

Backend API framework.

Why:

- extremely fast
- async support
- automatic OpenAPI docs
- clean architecture
- production readiness

Used for:

- resume analysis API
- candidate CRUD endpoints
- workflow endpoints

Current endpoints:

```text
POST /analyze
GET /candidates
POST /candidate/{id}/shortlist
POST /candidate/{id}/reject
```

---

## Uvicorn

ASGI server.

Why:

- lightweight
- high performance
- FastAPI-native

Used for:

```bash
uvicorn app.main:app --reload
```

---

## SQLAlchemy

ORM layer.

Why:

- clean database abstraction
- PostgreSQL compatibility
- model-based schema design
- scalable architecture

Used for:

- candidate model
- inserts
- updates
- queries

---

## psycopg2

PostgreSQL driver.

Why:

- stable PostgreSQL integration
- SQLAlchemy compatibility

Used for:

Neon PostgreSQL connection.

---

## python-dotenv

Environment variable management.

Why:

- API key security
- clean config separation
- production deployment support

Stores:

```env
GROQ_API_KEY=
DATABASE_URL=
```

---

# 🧠 AI / NLP Stack

This is the intelligence layer of the project.

---

## spaCy

Natural Language Processing library.

Why:

- text preprocessing
- normalization
- tokenization
- lightweight NLP workflows

Used for:

- resume cleaning
- text normalization
- preprocessing pipeline

---

## scikit-learn

Machine learning toolkit.

Why:

- TF-IDF vectorization
- similarity scoring
- reliable NLP utilities

Used for:

### TF-IDF Matching

Converts:

```text
resume text
job description
```

into vector representations.

Then computes similarity.

Used for ATS scoring.

---

## sentence-transformers

Semantic embedding library.

Why:

keyword matching alone is insufficient.

Sentence embeddings help understand meaning.

Example:

Resume says:

```text
Built ML prediction systems
```

JD says:

```text
Experience in predictive analytics
```

Keyword systems may miss this.

Embeddings capture semantic similarity.

Used for:

- contextual matching
- semantic ATS scoring
- intelligent relevance scoring

---

## PyTorch

Deep learning runtime backend.

Why:

sentence-transformers depends on it.

Used for:

- embedding inference
- semantic similarity calculations

---

# 🤖 LLM Layer

Used for recruiter reasoning.

---

## Groq API

LLM inference provider.

Why:

- extremely fast inference
- simple API integration
- cost-effective
- production-friendly

Used for:

AI recruiter analysis.

---

## Llama 3.3 70B

Language model used through Groq.

Responsibilities:

- candidate summary generation
- strengths analysis
- weakness detection
- hiring recommendations
- interview question generation

---

# 📄 Resume Parsing Stack

Responsible for document extraction.

---

## pdfplumber

Used for:

PDF text extraction.

Why:

- reliable parsing
- easy integration
- clean text extraction

---

## python-docx

Used for:

DOCX parsing.

Why:

- structured Word document support
- simple extraction

---

## PyMuPDF

Additional document parsing support.

Why:

- robust PDF handling
- fallback parsing workflows
- scalable parsing architecture

---

# 🗄 Database Stack

---

## PostgreSQL

Primary relational database.

Why:

- production-grade
- scalable
- reliable
- structured candidate storage

Stores:

- ATS results
- AI feedback
- candidate status
- timestamps

---

## Neon

Cloud PostgreSQL provider.

Why:

- serverless PostgreSQL
- easy setup
- cloud-hosted
- developer-friendly

Used because:

- instant provisioning
- secure connection strings
- production deployment support

---

# ☁ Deployment Stack (Planned)

---

## Vercel

Frontend hosting.

Why:

- Next.js native support
- CI/CD integration
- fast deployment

Planned for:

frontend production deployment.

---

## Railway / Render

Backend hosting.

Why:

- FastAPI support
- easy environment variables
- deployment simplicity

Planned for:

backend deployment.

---

## Neon

Already production-ready database host.

---

# 🔐 Authentication Stack (Planned)

---

## Clerk

Planned auth provider.

Why:

- Next.js integration
- secure auth flows
- built-in UI
- middleware protection

Planned features:

- login
- signup
- protected routes
- recruiter authentication

---

# 📧 Email Stack (Planned)

---

## Resend

Planned email provider.

Why:

- simple API
- transactional emails
- modern developer experience

Planned use:

- shortlist emails
- rejection emails
- hiring workflow communication

---

# 📦 Package Summary

## Frontend Packages

```bash
axios
lucide-react
@clerk/nextjs
tailwindcss
shadcn/ui
typescript
```

---

## Backend Packages

```bash
fastapi
uvicorn
sqlalchemy
psycopg2-binary
python-dotenv
python-multipart
```

---

## AI / NLP Packages

```bash
scikit-learn
sentence-transformers
torch
spacy
numpy
pandas
groq
```

---

## Parsing Packages

```bash
pdfplumber
python-docx
pymupdf
```

---

# 🏆 Architecture Philosophy

This stack reflects production engineering decisions:

✅ modern frontend architecture  
✅ scalable API backend  
✅ semantic AI intelligence  
✅ cloud persistence  
✅ recruiter workflow automation  
✅ deployment readiness  
✅ extensibility for SaaS evolution  

The goal was not just to build a demo—

but a foundation for a real AI hiring product.

---

Automatic candidate communication.

Examples:

### Shortlisted Email
```text
Congratulations! You have been shortlisted.
```

### Rejection Email
```text
Thank you for applying.
```

Planned provider:

- Resend

---

## 👤 Candidate Detail Pages

Dedicated profile pages:

```text
/dashboard/candidate/[id]
```

Features:

- full AI analysis
- ATS score breakdown
- hiring history
- decision notes

---

## 📎 Resume Preview

Embedded PDF/DOCX preview.

Recruiters can inspect original resumes directly.

---

## 📈 Advanced Analytics

Planned dashboard insights:

- ATS score distribution
- hiring conversion rates
- top skills frequency
- recruiter decision metrics

---

## 🔍 Advanced Search & Filtering

Future filters:

- score threshold
- date range
- specific skills
- recruiter status
- match score sorting

---

## 👥 Role-Based Access

Planned roles:

### Recruiter
Candidate management access

### Admin
System management access

### Candidate
Resume feedback access

---

## 🌐 Production Deployment

Planned deployment stack:

Frontend:
- Vercel

Backend:
- Railway / Render

Database:
- Neon

---

## 📂 Resume History Tracking

Future features:

- historical analyses
- re-analysis comparison
- candidate audit trail

---

## 📥 Bulk Resume Upload

Planned recruiter productivity feature:

Upload:

```text
multiple resumes at once
```

Batch ATS screening.

---

## 🤝 Collaboration Features

Potential additions:

- recruiter notes
- team comments
- shared candidate reviews

---

# 🏆 Why These Features Matter

This project demonstrates:

- NLP engineering
- LLM integration
- full-stack product architecture
- database-backed workflows
- recruiter automation systems
- scalable SaaS thinking
- production deployment readiness

This is more than a demo — it is a real product foundation.

---

# 🏗 System Architecture

AI Resume Screening follows a modular full-stack AI architecture.

The system is divided into:

- frontend presentation layer
- backend API layer
- NLP intelligence layer
- LLM reasoning layer
- persistence/database layer

This separation improves:

- maintainability
- scalability
- debugging
- deployment flexibility
- future SaaS expansion

---

# High-Level Architecture

```text
┌────────────────────────────────────────────┐
│              FRONTEND (Next.js)            │
│--------------------------------------------│
│ Resume Upload UI                           │
│ Job Description Input                      │
│ ATS Result Display                         │
│ HR Dashboard                               │
│ Search / Filters / Candidate Actions       │
└────────────────────────────────────────────┘
                    │
                    │ HTTP / REST API
                    ▼
┌────────────────────────────────────────────┐
│              BACKEND (FastAPI)             │
│--------------------------------------------│
│ API Routing                                │
│ Resume Processing                          │
│ Candidate CRUD                             │
│ Workflow Management                        │
└────────────────────────────────────────────┘
                    │
        ┌───────────┼────────────┐
        ▼           ▼            ▼

┌────────────────┐ ┌────────────────────┐ ┌────────────────────┐
│ Resume Parser  │ │ NLP Matching Engine │ │ LLM Analysis Layer │
│----------------│ │--------------------│ │--------------------│
│ PDF Extraction │ │ TF-IDF Matching     │ │ Groq API           │
│ DOCX Parsing   │ │ Skill Matching      │ │ Llama 3.3 70B      │
│ Text Cleaning  │ │ Embedding Similarity│ │ AI Feedback        │
└────────────────┘ └────────────────────┘ └────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────────┐
│         DATABASE (PostgreSQL / Neon)       │
│--------------------------------------------│
│ Candidate Records                          │
│ ATS Scores                                 │
│ AI Feedback                                │
│ Hiring Status                              │
│ Timestamps                                 │
└────────────────────────────────────────────┘
```

---

# Request Flow Architecture

## Resume Analysis Flow

```text
Recruiter opens frontend
        ↓
Uploads resume
        ↓
Enters job description
        ↓
Frontend sends POST /analyze
        ↓
FastAPI receives request
        ↓
Resume parser extracts text
        ↓
NLP engine computes ATS score
        ↓
Matched skills extracted
        ↓
Missing skills identified
        ↓
Groq LLM generates recruiter feedback
        ↓
Candidate saved in PostgreSQL
        ↓
Structured response returned
        ↓
Frontend displays results
```

---

## HR Dashboard Flow

```text
Recruiter opens dashboard
        ↓
Frontend requests GET /candidates
        ↓
FastAPI fetches candidate records
        ↓
PostgreSQL returns saved candidates
        ↓
Dashboard renders analytics + cards
        ↓
Recruiter clicks shortlist/reject
        ↓
Frontend sends update request
        ↓
Database status updated
        ↓
Dashboard refreshes
```

---

# Component Responsibilities

## Frontend Layer

Responsible for:

- user interaction
- UI rendering
- file upload
- recruiter dashboard
- displaying ATS results
- triggering API calls

Tech:

```text
Next.js + React + Tailwind + shadcn/ui
```

---

## API Layer

Responsible for:

- request validation
- routing
- backend orchestration
- workflow control

Tech:

```text
FastAPI
```

---

## Resume Parsing Layer

Responsible for:

- PDF extraction
- DOCX extraction
- resume text normalization

Tech:

```text
pdfplumber
python-docx
PyMuPDF
```

---

## NLP Matching Layer

Responsible for:

- ATS score generation
- semantic similarity
- skill overlap detection

Tech:

```text
TF-IDF
Sentence Transformers
spaCy
```

---

## LLM Reasoning Layer

Responsible for:

- candidate evaluation
- recruiter summary
- strengths analysis
- weaknesses
- interview questions
- hiring recommendation

Tech:

```text
Groq + Llama 3.3 70B
```

---

## Persistence Layer

Responsible for:

- candidate storage
- score persistence
- feedback storage
- hiring status updates

Tech:

```text
PostgreSQL + Neon
```

---

# Folder Structure

Project structure:

```text
AI-Resume-Screening/
│
├── backend/
│   │
│   ├── app/
│   │   │
│   │   ├── api/
│   │   │   └── routes.py
│   │   │
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── database.py
│   │   │
│   │   ├── models/
│   │   │   └── candidate.py
│   │   │
│   │   ├── services/
│   │   │   ├── parser_service.py
│   │   │   ├── matching_service.py
│   │   │   └── llm_service.py
│   │   │
│   │   └── main.py
│   │
│   ├── uploads/
│   ├── venv/
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   │
│   │   ├── app/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   │
│   │   ├── components/
│   │   │   └── ui/
│   │   │       ├── badge.tsx
│   │   │       ├── button.tsx
│   │   │       ├── card.tsx
│   │   │       ├── dialog.tsx
│   │   │       ├── input.tsx
│   │   │       ├── progress.tsx
│   │   │       ├── table.tsx
│   │   │       ├── tabs.tsx
│   │   │       └── textarea.tsx
│   │   │
│   │   └── lib/
│   │       └── utils.ts
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   └── .env.local
│
├── .gitignore
└── README.md
```

---

# Backend File Responsibilities

## `main.py`

Application entry point.

Responsibilities:

- initialize FastAPI app
- CORS middleware
- route registration
- database initialization

---

## `routes.py`

API endpoint definitions.

Responsibilities:

- resume upload endpoint
- candidate fetch endpoint
- shortlist endpoint
- reject endpoint

---

## `database.py`

Database configuration.

Responsibilities:

- SQLAlchemy engine
- session creation
- DB dependency injection

---

## `candidate.py`

Candidate ORM model.

Responsibilities:

- schema definition
- candidate data structure

---

## `parser_service.py`

Resume parsing service.

Responsibilities:

- PDF extraction
- DOCX extraction

---

## `matching_service.py`

ATS scoring logic.

Responsibilities:

- TF-IDF scoring
- embeddings
- skill matching
- ATS percentage calculation

---

## `llm_service.py`

AI reasoning service.

Responsibilities:

- prompt engineering
- Groq API calls
- recruiter feedback generation

---

# Frontend File Responsibilities

## `page.tsx`

Main analyzer interface.

Responsibilities:

- resume upload UI
- JD input
- ATS result rendering

---

## `dashboard/page.tsx`

Recruiter dashboard.

Responsibilities:

- candidate listing
- search
- filters
- shortlist/reject actions
- analytics rendering

---

## `layout.tsx`

Global application layout.

Responsibilities:

- shared wrappers
- future auth provider integration

---

## `components/ui/*`

Reusable UI components.

Used for:

- buttons
- dialogs
- cards
- progress bars
- inputs

---

# Architecture Design Principles

This project follows:

### Separation of Concerns
Each layer has a single responsibility.

---

### Modularity
Services are isolated.

Example:

```text
parsing != scoring != LLM logic
```

---

### Scalability
Future features can be added without major rewrites.

Examples:

- auth
- emails
- analytics
- candidate profiles

---

### API-First Design
Frontend and backend are decoupled.

Meaning:

- frontend can be replaced
- mobile app can reuse APIs
- backend can scale independently

---

### SaaS Evolution Readiness
Architecture supports transformation into:

```text
multi-user recruiter SaaS product
```

---

# Why This Architecture?

This structure was intentionally chosen to reflect real-world engineering practices rather than a monolithic demo implementation.

It makes the project:

✅ maintainable  
✅ extensible  
✅ deployment-ready  
✅ portfolio-worthy  
✅ collaboration-friendly

---

# ⚙ Installation & Setup Guide

This guide explains how to set up **AI Resume Screening** from scratch on a new machine.

By the end, you will have:

- frontend running
- backend running
- AI scoring working
- Groq LLM feedback working
- PostgreSQL database connected
- HR dashboard working

---

# 📋 Prerequisites

Install the following first:

## 1. Git

Download:

```text
https://git-scm.com/
```

Verify:

```bash
git --version
```

---

## 2. Node.js

Download:

```text
https://nodejs.org/
```

Recommended:

```text
Node.js 18+
```

Verify:

```bash
node -v
npm -v
```

---

## 3. Python

Download:

```text
https://python.org
```

Recommended:

```text
Python 3.11+
```

Verify:

```bash
python --version
```

---

## 4. VS Code

Download:

```text
https://code.visualstudio.com/
```

Recommended extensions:

- Python
- Pylance
- Tailwind CSS IntelliSense
- ESLint
- Prettier

---

# 🔑 Required Accounts

Create these free accounts:

## Groq
For AI feedback.

```text
https://console.groq.com/
```

---

## Neon
For PostgreSQL database.

```text
https://neon.tech/
```

---

## GitHub
For source control.

```text
https://github.com/
```

---

# 📥 Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-resume-screening.git
```

Move inside:

```bash
cd ai-resume-screening
```

---

# 🎨 Frontend Setup

Frontend stack:

- Next.js
- React
- TypeScript
- Tailwind
- shadcn/ui

---

## Step 1: Move into frontend

```bash
cd frontend
```

---

## Step 2: Install dependencies

```bash
npm install
```

If setting manually:

```bash
npm install axios lucide-react
npm install @clerk/nextjs
```

---

## Step 3: Install shadcn/ui

Initialize:

```bash
npx shadcn@latest init
```

Choose:

```text
TypeScript → Yes
Tailwind → Yes
App Router → Yes
```

---

## Step 4: Install UI components

```bash
npx shadcn@latest add dialog badge progress input card button textarea table tabs
```

---

## Step 5: Create environment file

Create:

```text
frontend/.env.local
```

Add:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

---

## Step 6: Start frontend

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:3000
```

Dashboard:

```text
http://localhost:3000/dashboard
```

---

# ⚙ Backend Setup

Backend stack:

- FastAPI
- SQLAlchemy
- PostgreSQL
- Groq
- NLP stack

---

## Step 1: Move into backend

```bash
cd backend
```

---

## Step 2: Create virtual environment

### Windows

```bash
python -m venv venv
```

Activate:

```bash
venv\Scripts\activate
```

---

### Mac/Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## Step 3: Upgrade pip

```bash
python -m pip install --upgrade pip
```

---

## Step 4: Install core backend packages

```bash
pip install fastapi uvicorn python-multipart pydantic python-dotenv
```

---

## Step 5: Install database packages

```bash
pip install sqlalchemy psycopg2-binary
```

---

## Step 6: Install parsing packages

```bash
pip install pdfplumber python-docx pymupdf
```

---

## Step 7: Install NLP / ML packages

```bash
pip install scikit-learn sentence-transformers torch spacy numpy pandas
```

---

## Step 8: Download spaCy model

```bash
python -m spacy download en_core_web_sm
```

---

## Step 9: Install Groq SDK

```bash
pip install groq
```

---

# 🗄 Database Setup (Neon PostgreSQL)

---

## Step 1: Create Neon account

```text
https://neon.tech
```

Sign up.

---

## Step 2: Create project

Suggested values:

Project name:

```text
ai-resume-screening
```

Database name:

```text
resumedb
```

Region:

```text
closest to your location
```

---

## Step 3: Copy connection string

Example:

```env
postgresql://username:password@host/database?sslmode=require
```

---

# 🔐 Environment Variables

Create:

```text
backend/.env
```

Add:

```env
GROQ_API_KEY=your_groq_api_key_here
DATABASE_URL=your_neon_postgresql_connection_string
```

Example:

```env
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxx
DATABASE_URL=postgresql://user:password@host/db?sslmode=require
```

---

# 🔑 Groq API Key Setup

---

## Step 1

Open:

```text
https://console.groq.com/
```

---

## Step 2

Create account.

---

## Step 3

Create API key.

---

## Step 4

Copy:

```env
gsk_xxxxxxxxx
```

Paste into:

```env
backend/.env
```

---

# 🚀 Start Backend

Activate environment:

### Windows

```bash
venv\Scripts\activate
```

Run:

```bash
uvicorn app.main:app --reload
```

---

Backend runs at:

```text
http://127.0.0.1:8000
```

Swagger docs:

```text
http://127.0.0.1:8000/docs
```

---

# ✅ Verify Installation

## Backend health check

Open:

```text
http://127.0.0.1:8000
```

Expected:

```json
{
  "message": "Resume Screening Bot API Running"
}
```

---

## Candidate endpoint

Open:

```text
http://127.0.0.1:8000/candidates
```

Expected:

```json
[]
```

or candidate records.

---

## Frontend

Open:

```text
http://localhost:3000
```

Expected:

AI Resume Screening homepage.

---

## Dashboard

Open:

```text
http://localhost:3000/dashboard
```

Expected:

candidate management dashboard.

---

# 🧪 Test Workflow

Use a sample resume.

Paste sample JD.

Click:

```text
Analyze Resume
```

Expected:

- ATS score
- matched skills
- missing skills
- AI recruiter feedback

Then:

Open dashboard.

Expected:

candidate record saved.

Try:

- shortlist
- reject
- filtering
- search

---

# 📦 Generate requirements.txt

Optional:

```bash
pip freeze > requirements.txt
```

---

# 🔄 Restart Commands

Frontend:

```bash
cd frontend
npm run dev
```

Backend:

```bash
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload
```

---

# 🪟 Windows Notes

If activation fails:

```bash
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then:

```bash
venv\Scripts\activate
```

---

# 🐧 Linux / Mac Notes

Use:

```bash
source venv/bin/activate
```

instead of:

```bash
venv\Scripts\activate
```

---

# 🧹 Clean Install (Optional)

--- 
# 📡 API Documentation

AI Resume Screening exposes REST APIs for resume analysis and candidate workflow management.

Base URL (local):

```text
http://127.0.0.1:8000
```

Interactive API docs:

```text
http://127.0.0.1:8000/docs
```

Swagger UI is automatically generated by FastAPI.

---

# API Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/analyze` | Analyze resume against job description |
| GET | `/candidates` | Fetch all saved candidates |
| POST | `/candidate/{id}/shortlist` | Shortlist a candidate |
| POST | `/candidate/{id}/reject` | Reject a candidate |

---

# 1. Analyze Resume

## Endpoint

```http
POST /analyze
```

Purpose:

Analyze uploaded resume using ATS scoring + AI recruiter evaluation.

---

## Request Type

```text
multipart/form-data
```

---

## Form Parameters

| Field | Type | Required | Description |
|------|------|----------|-------------|
| resume | File | Yes | PDF or DOCX resume |
| job_description | String | Yes | Job description text |

---

## Example Request

Using curl:

```bash
curl -X POST http://127.0.0.1:8000/analyze \
-F "resume=@resume.pdf" \
-F "job_description=Looking for a Python data scientist with NLP and FastAPI experience"
```

---

## Success Response

```json
{
  "id": 1,
  "filename": "RahulSinghResume.pdf",
  "match_score": 82.41,
  "matched_skills": [
    "python",
    "sql",
    "tensorflow",
    "fastapi",
    "nlp"
  ],
  "missing_skills": [
    "docker",
    "aws",
    "pytorch"
  ],
  "feedback": "Candidate Summary: Strong data science candidate...",
  "status": "pending"
}
```

---

## Response Fields

| Field | Type | Description |
|------|------|-------------|
| id | Integer | Candidate database ID |
| filename | String | Uploaded file name |
| match_score | Float | ATS match percentage |
| matched_skills | Array | Matching skills |
| missing_skills | Array | Missing required skills |
| feedback | String | AI recruiter analysis |
| status | String | Candidate status |

---

## Possible Errors

### Unsupported file format

```json
{
  "error": "Unsupported file format"
}
```

---

### LLM provider failure

Example:

```text
Groq API error
```

---

# 2. Fetch All Candidates

## Endpoint

```http
GET /candidates
```

Purpose:

Fetch all previously analyzed candidates from PostgreSQL.

---

## Example Request

```bash
curl http://127.0.0.1:8000/candidates
```

---

## Success Response

```json
[
  {
    "id": 1,
    "filename": "resume.pdf",
    "match_score": 75.4,
    "matched_skills": "python, sql",
    "missing_skills": "docker, aws",
    "feedback": "AI feedback text...",
    "status": "pending",
    "created_at": "2026-05-13T17:16:45"
  }
]
```

---

# 3. Shortlist Candidate

## Endpoint

```http
POST /candidate/{candidate_id}/shortlist
```

Example:

```http
POST /candidate/1/shortlist
```

Purpose:

Move candidate to shortlisted state.

---

## Example Request

```bash
curl -X POST http://127.0.0.1:8000/candidate/1/shortlist
```

---

## Success Response

```json
{
  "message": "Candidate shortlisted"
}
```

---

## Error Response

```json
{
  "error": "Candidate not found"
}
```

---

# 4. Reject Candidate

## Endpoint

```http
POST /candidate/{candidate_id}/reject
```

Example:

```http
POST /candidate/1/reject
```

Purpose:

Reject candidate.

---

## Example Request

```bash
curl -X POST http://127.0.0.1:8000/candidate/1/reject
```

---

## Success Response

```json
{
  "message": "Candidate rejected"
}
```

---

# Request Lifecycle

Example flow:

```text
Frontend uploads resume
        ↓
POST /analyze
        ↓
Backend parses resume
        ↓
AI analysis runs
        ↓
Candidate saved in DB
        ↓
Frontend dashboard fetches via GET /candidates
        ↓
Recruiter updates status
```

---

# 🗄 Database Schema

Database used:

```text
PostgreSQL (Neon)
```

Primary table:

```text
candidates
```

---

# Candidate Table Schema

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| id | Integer | No | Primary key |
| filename | String | No | Resume filename |
| match_score | Float | Yes | ATS score |
| matched_skills | Text | Yes | Matching skills |
| missing_skills | Text | Yes | Missing skills |
| feedback | Text | Yes | AI recruiter analysis |
| status | String | Yes | Candidate workflow state |
| created_at | Timestamp | No | Record creation time |

---

# SQLAlchemy Model

```python
class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    match_score = Column(Float)
    matched_skills = Column(Text)
    missing_skills = Column(Text)
    feedback = Column(Text)
    status = Column(String, default="pending")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
```

---

# Status Lifecycle

Allowed states:

### Pending

Default state after analysis.

```text
pending
```

---

### Shortlisted

Set when recruiter accepts candidate.

```text
shortlisted
```

---

### Rejected

Set when recruiter rejects candidate.

```text
rejected
```

---

# Example Database Record

```json
{
  "id": 7,
  "filename": "candidate_resume.pdf",
  "match_score": 88.7,
  "matched_skills": "python, sql, fastapi, nlp",
  "missing_skills": "docker, aws",
  "feedback": "Strong candidate...",
  "status": "shortlisted",
  "created_at": "2026-05-13T17:20:30"
}
```

---

# 👨‍💻 Usage Guide

This section explains how recruiters use the platform.

---

# Step 1: Start Services

Backend:

```bash
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload
```

Frontend:

```bash
cd frontend
npm run dev
```

---

# Step 2: Open Frontend

```text
http://localhost:3000
```

---

# Step 3: Upload Resume

Supported:

- PDF
- DOCX

Select candidate resume.

---

# Step 4: Enter Job Description

Paste hiring requirements.

Example:

```text
Looking for a data scientist with Python, SQL, NLP, FastAPI, machine learning, Docker, and cloud deployment experience.
```

---

# Step 5: Analyze Candidate

Click:

```text
Analyze Resume
```

System performs:

- parsing
- scoring
- skill matching
- AI reasoning
- DB persistence

---

# Step 6: Review Results

Displayed:

- ATS score
- matched skills
- missing skills
- recruiter AI feedback

---

# Step 7: Open Dashboard

Navigate to:

```text
http://localhost:3000/dashboard
```

Dashboard provides:

- candidate listing
- ATS visualization
- filtering
- search
- feedback modal

---

# Step 8: Manage Candidates

Available actions:

### Shortlist

Moves candidate to:

```text
shortlisted
```

---

### Reject

Moves candidate to:

```text
rejected
```

---

# Example Recruiter Workflow

```text
Open platform
        ↓
Upload resume
        ↓
Paste JD
        ↓
Analyze
        ↓
Review AI feedback
        ↓
Open dashboard
        ↓
Shortlist / reject
```

---

# Example Candidate Evaluation Scenario

Resume contains:

```text
Python
SQL
Machine Learning
Flask
TensorFlow
```

JD requires:

```text
Python
SQL
FastAPI
Docker
AWS
NLP
```

Possible result:

```text
ATS Score: 68%
Matched:
Python
SQL

Missing:
FastAPI
Docker
AWS
NLP
```

AI feedback:

```text
Technically strong but lacks cloud deployment exposure.
```

---

# API Security Notes

Current implementation:

```text
local development mode
```

No auth protection yet.

Planned:

- Clerk authentication
- protected routes
- recruiter-only access

Frontend reinstall:

```bash
rm -rf node_modules
npm install
```

Backend reinstall:

```bash
pip freeze > requirements.txt
pip install -r requirements.txt
```

---

# 🏁 Quick Start Summary

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend:

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

Setup complete 🎉

--- 
# 🛠 Troubleshooting Guide

This section documents common issues encountered during setup and development, along with fixes.

---

# 1. CORS Error

## Problem

Frontend shows:

```text
Access to XMLHttpRequest has been blocked by CORS policy
```

or

```text
No 'Access-Control-Allow-Origin' header
```

---

## Cause

FastAPI backend is not allowing frontend origin.

---

## Fix

In:

```python
backend/app/main.py
```

Add:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Restart backend:

```bash
uvicorn app.main:app --reload
```

---

# 2. Axios Network Error

## Problem

Frontend shows:

```text
AxiosError: Network Error
```

---

## Cause

Usually one of:

- backend not running
- incorrect API URL
- localhost mismatch

---

## Fix

Ensure backend is running:

```bash
uvicorn app.main:app --reload
```

Use:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Instead of:

```env
localhost
```

---

# 3. Backend Not Starting

## Problem

PowerShell shows:

```text
uvicorn : The term 'uvicorn' is not recognized
```

---

## Cause

Virtual environment not activated.

---

## Fix

Windows:

```bash
venv\Scripts\activate
```

Then:

```bash
uvicorn app.main:app --reload
```

---

# 4. PowerShell Script Execution Error

## Problem

```text
execution of scripts is disabled
```

---

## Fix

Run:

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then:

```bash
venv\Scripts\activate
```

---

# 5. PostgreSQL Table Missing

## Problem

```text
relation "candidates" does not exist
```

---

## Cause

Database schema not initialized.

---

## Fix

Ensure model import happens before:

```python
Base.metadata.create_all(bind=engine)
```

Example:

```python
from app.models.candidate import Candidate
```

---

# 6. NumPy SQLAlchemy Float Error

## Problem

```text
schema "np" does not exist
```

or SQL insert fails with:

```text
np.float64
```

---

## Cause

NumPy float type passed directly to SQLAlchemy.

---

## Fix

Convert explicitly:

```python
float(analysis["match_score"])
```

---

# 7. Groq Package Missing

## Problem

```text
ModuleNotFoundError: No module named 'groq'
```

---

## Fix

Install:

```bash
pip install groq
```

---

# 8. Groq API Key Error

## Problem

LLM feedback fails.

---

## Cause

Missing:

```env
GROQ_API_KEY
```

---

## Fix

Add:

```env
GROQ_API_KEY=your_key_here
```

in:

```text
backend/.env
```

---

# 9. Gemini API Quota / Model Errors

If migrating from Gemini:

Errors:

```text
404 model not found
```

or

```text
429 quota exceeded
```

Recommended fix:

Use Groq instead.

---

# 10. Neon Connection Issues

## Problem

Database connection fails.

---

## Fix

Check:

```env
DATABASE_URL=
```

Must include:

```text
sslmode=require
```

Example:

```env
postgresql://user:password@host/db?sslmode=require
```

---

# 11. Frontend Missing on GitHub

## Problem

Frontend folder not uploaded.

---

## Cause

Nested Git repository.

---

## Fix

Remove frontend nested git:

```bash
git rm --cached frontend
```

Delete nested:

```bash
frontend/.git
```

Re-add:

```bash
git add frontend
```

Commit:

```bash
git commit -m "fix frontend tracking"
```

---

# 12. spaCy Model Missing

## Problem

```text
Can't find model 'en_core_web_sm'
```

---

## Fix

Install:

```bash
python -m spacy download en_core_web_sm
```

---

# 13. Dashboard Not Updating

## Cause

Frontend cache or stale state.

---

## Fix

Restart frontend:

```bash
npm run dev
```

Refresh browser.

---

# 14. Unsupported File Format

Supported:

- PDF
- DOCX

Unsupported:

- TXT
- JPG
- PNG

---

# 🚀 Deployment Guide

Production deployment architecture:

```text
Frontend → Vercel
Backend → Railway / Render
Database → Neon
```

---

# Frontend Deployment (Vercel)

## Step 1

Push code to GitHub.

---

## Step 2

Open:

```text
https://vercel.com
```

---

## Step 3

Import GitHub repository.

---

## Step 4

Set environment variables:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

---

## Step 5

Deploy.

---

# Backend Deployment (Railway)

## Step 1

Open:

```text
https://railway.app
```

---

## Step 2

Create new project.

---

## Step 3

Deploy backend repository.

---

## Step 4

Add environment variables:

```env
GROQ_API_KEY=
DATABASE_URL=
```

---

## Step 5

Set start command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Deploy.

---

# Alternative Backend Deployment (Render)

Use:

```text
https://render.com
```

Setup similarly.

---

# Database Deployment

Already production-hosted:

```text
Neon PostgreSQL
```

No extra hosting required.

---

# Production Architecture

```text
Users
   ↓
Vercel Frontend
   ↓
Railway FastAPI Backend
   ↓
Neon PostgreSQL
   ↓
Groq LLM API
```

---

# 🔮 Roadmap

Planned upcoming features.

---

## Authentication

Planned:

- Clerk auth
- sign up
- sign in
- logout
- protected routes

---

## Role-Based Access

Roles:

- recruiter
- admin
- candidate

---

## Email Notifications

Using:

```text
Resend
```

Features:

- shortlist emails
- rejection emails

---

## Resume Preview

Embedded resume viewing.

---

## Candidate Detail Pages

Future routes:

```text
/dashboard/candidate/[id]
```

---

## Advanced Analytics

Planned charts:

- ATS score distribution
- candidate funnel
- hiring conversion
- skills heatmap

---

## Bulk Resume Upload

Batch ATS analysis.

---

## Team Collaboration

Future:

- recruiter notes
- shared reviews
- comments

---

## Export Features

Planned:

- CSV export
- PDF reports

---

## Production Auth Security

- JWT
- protected API routes
- session management

---

# 🤝 Contribution Guide

Contributions are welcome.

---

## Fork Repository

```bash
git fork
```

---

## Clone

```bash
git clone your-fork-url
```

---

## Create Branch

```bash
git checkout -b feature/new-feature
```

---

## Commit

```bash
git commit -m "add feature"
```

---

## Push

```bash
git push origin feature/new-feature
```

---

## Pull Request

Open PR.

---

# Code Standards

Recommended:

- clean architecture
- modular services
- typed frontend code
- reusable components
- environment-based config

---

# Testing Suggestions

Future testing:

Frontend:
- Jest
- React Testing Library

Backend:
- Pytest

API:
- integration tests

---

# License

MIT License

```text
Copyright (c) 2026 Rahul Singh
```

Permission granted to use, modify, distribute.

---

# 👨‍💻 Author

## Rahul Singh

AI / Data Science / Full Stack Developer

Built as a practical AI engineering + recruiter automation project.

---

# 🌟 Support

If you found this useful:

⭐ Star the repository

Share feedback / contribute improvements.

---

# Final Note

AI Resume Screening is designed as more than a demo project.

It is a foundation for a scalable AI recruitment SaaS platform combining:

- NLP
- LLMs
- FastAPI
- Next.js
- PostgreSQL
- recruiter workflow automation

Future evolution:

```text
AI hiring assistant platform
```

🚀
---
