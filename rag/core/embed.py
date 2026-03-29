from db.chroma_store import ChromaStore
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
def load_chunks(file_path="D:\\ChronoWeave-2\\ChronoWeave\\rag\\data\\processed\\chunks.txt"):
    with open(file_path, "r", encoding="utf-8") as f:
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