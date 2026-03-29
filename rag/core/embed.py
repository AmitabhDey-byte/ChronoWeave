from __future__ import annotations

from pathlib import Path

from db.chroma_store import ChromaStore


CORE_DIR = Path(__file__).resolve().parent
RAG_DIR = CORE_DIR.parent
DEFAULT_CHUNKS_PATH = RAG_DIR / "data" / "processed" / "chunks.txt"


def load_chunks(file_path: str | Path | None = None):
    target = Path(file_path) if file_path else DEFAULT_CHUNKS_PATH
    with target.open("r", encoding="utf-8") as f:
        raw = f.read()

    chunks = raw.split("\n---\n")
    return [c.strip() for c in chunks if c.strip()]


def detect_source(chunk: str):
    # simple heuristic
    if "Learning Path:" in chunk:
        return "csv"
    return "pdf"


def main():
    print("Loading chunks...")
    chunks = load_chunks()

    print(f"Found {len(chunks)} chunks")

    store = ChromaStore()

    documents = []

    for i, chunk in enumerate(chunks):
        source_type = detect_source(chunk)

        doc = {
            "id": f"doc_{i}",
            "text": chunk,
            "metadata": {
                "source": source_type,  
                "type": "roadmap",
            },
        }

        documents.append(doc)

    print("Creating embeddings + storing...")
    store.add_documents(documents)

    print(" Done!")


if __name__ == "__main__":
    main()
