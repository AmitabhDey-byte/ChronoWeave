import sys
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


# 1. Get the absolute path of the directory where main.py lives (the backend folder)
BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))

# 2. Add the backend folder to the front of the path to prioritize your local utils.py
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

# 3. Add the RAG folders (as we did before)
RAG_BASE = r"D:\ChronoWeave-2\ChronoWeave\rag"
RAG_CORE = os.path.join(RAG_BASE, "core")
for path in [RAG_BASE, RAG_CORE]:
    if path not in sys.path:
        sys.path.append(path)

try:
    # Now try the imports
    from utils import parse_llm_response
    from pipeline import RAGPipeline
    print("✅ All modules imported successfully!")
except ImportError as e:
    print(f"❌ Still hitting an import error: {e}")
# --- THE ABSOLUTE SUBFOLDER FIX ---
RAG_BASE = r"D:\ChronoWeave-2\ChronoWeave\rag"
RAG_CORE = os.path.join(RAG_BASE, "core")

# Add both to path so 'import pipeline' and 'import retriever' work
for path in [RAG_BASE, RAG_CORE]:
    if path not in sys.path:
        sys.path.append(path)

try:
    # Since pipeline.py is in 'core', and we added 'core' to path:
    from pipeline import RAGPipeline 
    from utils import parse_llm_response # Assuming this is in your backend/utils.py
except ImportError as e:
    print(f"❌ IMPORT ERROR: {e}")
    # This happens if 'core' isn't being seen correctly
    class RAGPipeline: 
        def generate_roadmap(self, q): return "Error: Pipeline not found in core folder."

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

rag = RAGPipeline()

class RoadmapRequest(BaseModel):
    query: str

@app.post("/api/v1/roadmap/generate")
async def generate(request: RoadmapRequest):
    try:
        # Call your RAG system
        result = rag.generate_roadmap(request.query)
        # Parse for the 2D UI
        return {"status": "success", "steps": parse_llm_response(result)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)