from pydantic_settings import BaseSettings
from typing import List, Optional
import os
from pathlib import Path


class Settings(BaseSettings):
    """Application settings"""
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "your-secret-key-here-change-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8 
    SERVER_NAME: str = "ChronoWeave API"
    SERVER_HOST: str = "0.0.0.0"
    SERVER_PORT: int = 8000
    DEBUG: bool = True

    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",  
        "http://127.0.0.1:3000", 
        "http://localhost:8000",  
    ]

    RAG_DATA_PATH: str = str(Path(__file__).parent.parent.parent.parent / "rag" / "data")
    CHROMA_DB_PATH: str = str(Path(__file__).parent.parent.parent.parent / "rag" / "data" / "embeddings")

    MODEL_NAME: str = "sentence-transformers/all-MiniLM-L6-v2"
    DEVICE: str = "cpu"


    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()