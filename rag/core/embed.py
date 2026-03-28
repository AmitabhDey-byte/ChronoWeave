from db.chroma_store import ChromaStore
def load_chunks(file_path="rag/data/processed/chunks.txt"):
    with open(file_path, "r", encoding="utf-8") as f:
        raw = f.read()
    chunks = raw.split("\n---\n")
    return [c.strip() for c in chunks if c.strip()]

def main():
    print("Loading chunks...")
    chunks = load_chunks()
    print(f"Found {len(chunks)} chunks")

    store = ChromaStore()

    documents = [
        {
            "id": f"doc_{i}",
            "text": chunk,
            "metadata": {"source": "pdf", "type": "roadmap"},
        }
        for i, chunk in enumerate(chunks)
    ]
    print("Creating embeddings + storing...")
    store.add_documents(documents) 
    print("Done!")

if __name__ == "__main__":
    main()