from __future__ import annotations

import os
import sys
from functools import lru_cache
from pathlib import Path
from typing import Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


APP_DIR = Path(__file__).resolve().parent
BACKEND_DIR = APP_DIR.parent
PROJECT_ROOT = BACKEND_DIR.parent
RAG_CORE_DIR = PROJECT_ROOT / "rag" / "core"

for path in (APP_DIR, RAG_CORE_DIR):
    path_str = str(path)
    if path_str not in sys.path:
        sys.path.insert(0, path_str)

from pipeline_service import RAGPipeline  # noqa: E402
from utils import build_query_from_profile, parse_llm_response  # noqa: E402


class LearnerProfile(BaseModel):
    experienceLevel: str = "beginner"
    learningGoals: list[str] = Field(default_factory=list)
    interests: list[str] | str = Field(default_factory=list)
    preferredPace: str | None = None
    timeCommitment: str | None = None
    background: str | None = None


class RoadmapRequest(BaseModel):
    query: str | None = None
    profile: LearnerProfile | None = None


app = FastAPI(
    title="ChronoWeave API",
    description="Backend + RAG orchestration for ChronoWeave.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        os.getenv("FRONTEND_URL", "http://localhost:3000"),
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@lru_cache(maxsize=1)
def get_rag() -> RAGPipeline:
    return RAGPipeline()


def _normalize_profile(profile: LearnerProfile | None) -> dict[str, Any] | None:
    if profile is None:
        return None
    payload = profile.model_dump()
    interests = payload.get("interests")
    if isinstance(interests, str):
        payload["interests"] = [item.strip() for item in interests.split(",") if item.strip()]
    return payload


@app.get("/health")
async def healthcheck():
    rag = get_rag()
    return {"status": "ok", **rag.get_diagnostics()}


@app.post("/api/v1/recommendations")
async def recommendations(request: RoadmapRequest):
    try:
        rag = get_rag()
        profile = _normalize_profile(request.profile)
        query = request.query or build_query_from_profile(profile or {})
        preview = rag.generate_preview(query=query, profile=profile)
        return {"status": "success", **preview}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@app.post("/api/v1/roadmap/generate")
async def generate(request: RoadmapRequest):
    try:
        rag = get_rag()
        profile = _normalize_profile(request.profile)
        query = request.query or build_query_from_profile(profile or {})
        result = rag.generate_roadmap(query=query, profile=profile)

        return {
            "status": "success",
            "query": query,
            "overview": result["overview"],
            "steps": parse_llm_response(result["roadmap"]),
            "sources": result["sources"],
            "diagnostics": result["diagnostics"],
        }
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
