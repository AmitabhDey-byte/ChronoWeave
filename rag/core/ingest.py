from pypdf import PdfReader
import os

def load_pdf(file_path: str) -> str:
    reader = PdfReader(file_path)
    text = ""

    for page in reader.pages:
        content = page.extract_text()
        if content:
            text += content + "\n"

    return text


def chunk_text(text: str, chunk_size=500, overlap=100):
    chunks = []
    start = 0

    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]

        if chunk.strip():  # avoid empty chunks
            chunks.append(chunk)

        start += chunk_size - overlap

    return chunks


def save_chunks(chunks, output_path):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    with open(output_path, "w", encoding="utf-8") as f:
        for chunk in chunks:
            f.write(chunk + "\n---\n")


def process_pdf():
    input_path = "rag/data/raw/roadmap.pdf"
    output_path = "rag/data/processed/chunks.txt"

    print("Reading PDF...")
    text = load_pdf(input_path)

    print(" Chunking text...")
    chunks = chunk_text(text)

    print(f" Total chunks created: {len(chunks)}")

    save_chunks(chunks, output_path)

    print("Chunks saved successfully!")


if __name__ == "__main__":
    process_pdf()