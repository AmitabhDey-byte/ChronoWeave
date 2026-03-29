# ChronoWeave

ChronoWeave is an AI-powered learning roadmap platform built to turn a learner's goals, interests, pace, and background into a practical, personalized action plan. It combines a modern Next.js frontend, a FastAPI backend, and a Retrieval-Augmented Generation (RAG) pipeline so the generated roadmap is not only personalized, but also grounded in indexed source material.

The project is designed as a full-stack learning studio:
- the frontend handles onboarding, dashboard, profile, roadmap display, and authentication
- the backend exposes the API for health checks, recommendations, and roadmap generation
- the RAG layer retrieves relevant knowledge from indexed documents and helps shape source-aware plans

---

## Table of Contents

- [Overview](#overview)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Authentication](#authentication)
- [Frontend Experience](#frontend-experience)
- [Backend API](#backend-api)
- [RAG Pipeline](#rag-pipeline)
- [Environment Variables](#environment-variables)
- [Local Development](#local-development)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Roadmap Generation Flow](#roadmap-generation-flow)
- [Deployment Notes](#deployment-notes)
- [Known Notes](#known-notes)
- [Future Improvements](#future-improvements)

---

## Overview

ChronoWeave helps learners move from vague ambition to a step-by-step plan.

A user can:
- sign in with Clerk
- complete onboarding with learning preferences and goals
- save a richer profile with identity and learner metadata
- request recommendations
- generate a roadmap grounded in indexed knowledge sources
- explore a styled notebook-like interface for studying and planning

The current product direction combines:
- a Gen Z-friendly visual style
- modular React components
- authenticated profile management
- typed API integration
- a RAG-backed generation pipeline

---

## Core Features

### Personalized onboarding
Users answer questions about:
- experience level
- learning goals
- interests
- preferred pace
- time commitment
- background

This profile is then used to shape API requests and roadmap generation.

### AI-generated roadmap creation
ChronoWeave generates a structured roadmap that includes:
- a high-level overview
- step-by-step phases
- suggested areas of focus
- retrieval-backed supporting context
- diagnostics about the generation mode

### Retrieval-Augmented Generation
The RAG system:
- ingests documents
- creates embeddings
- stores them in ChromaDB
- retrieves relevant context
- passes that context into the roadmap generation pipeline

### Authentication with Clerk
Protected sections of the app require sign-in. Clerk is used for:
- sign in
- sign up
- protected routes
- user profile identity
- storing ChronoWeave-specific metadata

### Modern modular frontend
The frontend is organized into reusable components for:
- layout
- onboarding
- profile editing
- loaders
- roadmap rendering
- UI primitives like cards, buttons, inputs, and textareas

### Notebook-style learning UI
The protected app uses a 2D notebook-inspired interface with:
- ruled-paper surfaces
- bold outline shadows
- modular cards
- notebook-like roadmap loading states

---

## Tech Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Clerk
- Framer Motion
- Lucide React
- Tailwind CSS

### Backend
- FastAPI
- Uvicorn
- Pydantic
- Python

### RAG / AI Layer
- ChromaDB
- custom retriever and pipeline logic
- Hugging Face based model integration
- embedding and ingestion scripts

---

## Architecture

```text
Frontend (Next.js)
  -> collects onboarding/profile data
  -> calls backend API
  -> renders recommendations and roadmap

Backend (FastAPI)
  -> receives profile/query payload
  -> builds request context
  -> invokes RAG pipeline
  -> returns structured roadmap response

RAG Layer
  -> retrieves relevant indexed source material
  -> combines retrieval context with learner profile
  -> generates roadmap output
Project Structure
ChronoWeave/
├── backend/
│   ├── app/
│   │   ├── server.py
│   │   ├── main.py
│   │   └── utils.py
│   ├── requirements.txt
│   └── run.py
│
├── frontend/
│   └── my-app/
│       ├── app/
│       │   ├── (protected)/
│       │   ├── sign-in/
│       │   ├── sign-up/
│       │   ├── verify/
│       │   ├── globals.css
│       │   ├── layout.tsx
│       │   └── page.tsx
│       ├── components/
│       │   ├── auth/
│       │   ├── layout/
│       │   ├── loader/
│       │   ├── onboarding/
│       │   ├── profile/
│       │   ├── roadmap/
│       │   └── ui/
│       ├── lib/
│       │   ├── api-client.ts
│       │   ├── clerk-profile.ts
│       │   ├── profile.ts
│       │   └── utils.ts
│       ├── middleware.ts
│       └── package.json
│
├── rag/
│   ├── core/
│   │   ├── pipeline.py
│   │   ├── pipeline_service.py
│   │   ├── ingest.py
│   │   ├── embed.py
│   │   └── run.py
│   ├── data/
│   └── run.py
│
├── scripts/
│   └── dev-runner.js
│
├── package.json
└── README.md
How It Works
ChronoWeave has three major layers working together.

1. User profile collection
The frontend collects learner data through onboarding and profile editing.

2. Backend orchestration
The backend accepts either:

a direct query
a learner profile that gets converted into a query
It then calls the RAG pipeline.

3. RAG-grounded roadmap generation
The RAG pipeline:

checks retrieval readiness
gets relevant documents
builds a prompt using the query and profile
generates a roadmap
returns an overview, steps, sources, and diagnostics
Authentication
Clerk is used to secure the application.

Protected routes
The middleware protects all non-public routes.

Public routes
Examples include:

/
/sign-in
/sign-up
/verify
/sso-callback
Clerk metadata usage
ChronoWeave stores app-specific data in Clerk metadata, including:

public learner-facing identity details
ChronoWeave profile details
learner roadmap preferences and context
This allows the profile page to feel persistent across sessions.

Frontend Experience
Landing page
The landing page introduces ChronoWeave with a modular, editorial-style layout.

Protected studio
After authentication, users can access:

dashboard
onboarding
roadmap
profile
Profile section
The profile page now supports:

signed-in identity display
editable profile data
Clerk-backed persistence
learner metadata used for roadmap generation
Roadmap UI
The roadmap screen presents generated steps in a notebook-inspired 2D layout with:

phase cards
source notes
diagnostics
better loading states while generation is happening
Backend API
The backend is the orchestrator between the frontend and the RAG system.

Responsibilities
validate incoming payloads
normalize learner profile data
build queries from profile information
call the RAG pipeline
return consistent JSON responses
Main backend entrypoint
backend/run.py

Main app server
backend/app/server.py

Utility functions
backend/app/utils.py

RAG Pipeline
The RAG system is responsible for grounding roadmap generation in indexed content.

Main parts
ingestion
embedding creation
retrieval
prompt construction
roadmap generation
fallback behavior when the generator is unavailable
Core files
rag/run.py
rag/core/run.py
rag/core/pipeline.py
rag/core/pipeline_service.py
RAG output includes
overview
generated roadmap text
source excerpts
diagnostics about generator availability and retrieval readiness
Environment Variables
Root / general
You may optionally define environment values depending on your deployment setup.

Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
Backend
BACKEND_HOST=0.0.0.0
BACKEND_PORT=8000
DEBUG=true
FRONTEND_URL=http://localhost:3000
Notes
Never commit real production secrets.
Rotate credentials if they were ever exposed publicly.
Frontend and backend ports should stay aligned with your local setup.
Local Development
Prerequisites
Node.js 18+
Python 3.10+ recommended
npm
pip
1. Install dependencies
npm install
cd frontend/my-app && npm install
cd ../../backend && pip install -r requirements.txt
2. Return to project root
cd ..
If you are inside backend, go back to the project root before continuing.

3. Start development mode
From the project root:

npm run dev
This uses the custom root dev runner to:

check whether RAG embeddings already exist
prepare RAG if needed
start the backend
start the frontend
4. Open the app
Frontend: http://localhost:3000
Backend docs: http://localhost:8000/docs
Backend health: http://localhost:8000/health
Available Scripts
Root scripts
npm run dev
npm run backend
npm run frontend
npm run build
npm run start
npm run rag
npm run rag:ingest
npm run rag:embed
npm run install:all
npm run setup
What they do
npm run dev
Starts the full local development flow.
npm run backend
Starts FastAPI only.
npm run frontend
Starts Next.js only.
npm run rag
Runs the RAG pipeline in all mode.
npm run rag:ingest
Runs ingestion only.
npm run rag:embed
Runs embedding creation only.
npm run build
Builds the frontend.
npm run start
Starts the production frontend server.
API Endpoints
GET /health
Returns:

backend status
RAG readiness
document counts
generator availability
POST /api/v1/recommendations
Returns a preview response with:

headline
summary
focus areas
top source
diagnostics
Example payload:

{
  "profile": {
    "experienceLevel": "beginner",
    "learningGoals": ["frontend development"],
    "interests": ["react", "ui design"],
    "preferredPace": "steady",
    "timeCommitment": "6 hours a week",
    "background": "basic HTML and CSS knowledge"
  }
}
POST /api/v1/roadmap/generate
Returns:

query
overview
roadmap steps
source excerpts
diagnostics
Example payload:

{
  "profile": {
    "experienceLevel": "intermediate",
    "learningGoals": ["full-stack development"],
    "interests": ["next.js", "apis", "product building"],
    "preferredPace": "supportive mentor",
    "timeCommitment": "8 hours a week",
    "background": "comfortable with frontend basics"
  }
}
Roadmap Generation Flow
User signs in
  -> completes onboarding or updates profile
  -> frontend stores / syncs learner data
  -> frontend requests roadmap generation
  -> backend builds query from learner profile
  -> RAG retrieves relevant source material
  -> model or fallback generator produces roadmap
  -> frontend renders notebook-style roadmap UI
Deployment Notes
Frontend
The frontend can be deployed as a standard Next.js app.

Backend
The backend can be deployed separately as a FastAPI service.

RAG data
If you deploy the backend separately, make sure:

the RAG data path exists
embeddings are already created
model dependencies are available
file paths are valid in the deployment environment
Authentication
For production:

use production Clerk keys
configure allowed origins and redirect URLs correctly
review secret handling carefully
Known Notes
Some legacy files still exist from earlier UI experiments and may not reflect the current design direction.
Full-project linting may surface older unrelated warnings/errors outside the latest updated files.
The RAG layer can fall back to a non-generator path when the primary model is unavailable.
Local storage is still used in some flows as a convenience layer, but Clerk metadata is now the longer-term profile source for authenticated users.
Future Improvements
persist learner profile to a dedicated backend database
add roadmap regeneration history
allow roadmap export as PDF or shareable page
introduce progress tracking per roadmap step
support richer source inspection and citation UI
improve dashboard analytics and learning streaks
add team or mentor collaboration mode
Summary
ChronoWeave is a full-stack AI learning platform that blends:

modern frontend UX
protected authentication flows
personalized learner profiling
FastAPI backend orchestration
RAG-grounded roadmap generation
Its goal is simple: help learners move from uncertainty to a clear, actionable plan that feels personal, motivating, and grounded in real knowledge.



**Happy Learning! 🎓✨**
