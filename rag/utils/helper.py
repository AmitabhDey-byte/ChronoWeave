import uuid

def chunk_text(text: str, chunk_size=500, overlap=100):
    chunks = []
    start = 0

    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]

        if chunk.strip():
            chunks.append(chunk)

        start += chunk_size - overlap

    return chunks


def generate_id():
    return str(uuid.uuid4())

def format_docs(chunks, metadata=None):
    """
    Convert chunks into structured documents
    """
    docs = []

    for chunk in chunks:
        docs.append({
            "id": generate_id(),
            "text": chunk,
            "metadata": metadata or {}
        })

    return docs

def format_context(docs):
    """
    Combine retrieved docs into single context string
    """
    return "\n\n".join([doc["text"] for doc in docs])

def clean_text(text: str):
    return text.replace("\n", " ").strip()