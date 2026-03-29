# ChronoWeave

ChronoWeave is an AI-powered learning roadmap platform built with Next.js, FastAPI, and a RAG pipeline. It helps users turn their goals, interests, and background into a structured roadmap with source-aware guidance.

## Features

- personalized onboarding-based learner profiles
- roadmap generation powered by backend and RAG
- Clerk authentication with protected routes
- profile management linked to user metadata
- notebook-style UI for the learning studio

## Tech Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Clerk
- Framer Motion

### Backend
- FastAPI
- Uvicorn
- Pydantic

### RAG Layer
- ChromaDB
- custom ingestion, embedding, retrieval, and generation pipeline

## Project Structure

```text
ChronoWeave/
+-- backend/                FastAPI backend
+-- frontend/my-app/        Next.js frontend
+-- rag/                    RAG pipeline and indexed data
+-- scripts/                root dev utilities
+-- package.json            root scripts
+-- README.md
```

## Quick Start

### Install dependencies

```bash
npm install
cd frontend/my-app && npm install
cd ../../backend && pip install -r requirements.txt
```

### Run locally

From the project root:

```bash
npm run dev
```

This starts:
- frontend
- backend
- RAG preparation if needed

## Useful Scripts

```bash
npm run dev
npm run backend
npm run frontend
npm run rag
npm run rag:ingest
npm run rag:embed
```

## Environment Variables

### Frontend

Create `frontend/my-app/.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

### Backend

Optional example:

```env
BACKEND_HOST=0.0.0.0
BACKEND_PORT=8000
DEBUG=true
FRONTEND_URL=http://localhost:3000
```

## API Endpoints

- `GET /health`
- `POST /api/v1/recommendations`
- `POST /api/v1/roadmap/generate`

## Notes

- the backend already integrates the RAG pipeline for roadmap generation
- Clerk secures protected routes and stores user-linked profile metadata
- if secrets were exposed during development, rotate them before deployment
