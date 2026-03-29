from pypdf import PdfReader
import os


def load_pdf(input_path: str) -> str:
    reader = PdfReader(input_path)
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

        if chunk.strip():  
            chunks.append(chunk)

        start += chunk_size - overlap

    return chunks


def save_chunks(chunks, output_path):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    with open(output_path, "w", encoding="utf-8") as f:
        for chunk in chunks:
            f.write(chunk + "\n---\n")

def process_pdfs():
    input_dir = r"\ChronoWeave\rag\data\raw"
    output_path = "rag/data/processed/chunks.txt"

    all_text = ""

    print(" Reading PDFs from folder...")

    for file in os.listdir(input_dir):
        if file.endswith(".pdf"):
            file_path = os.path.join(input_dir, file)
            print(f" Processing: {file}")

            text = load_pdf(file_path)
            all_text += text + "\n"

    if not all_text.strip():
        print(" No text extracted. Check PDFs.")
        return

    print(" Chunking combined text...")
    chunks = chunk_text(all_text)

    print(f" Total chunks created: {len(chunks)}")

    save_chunks(chunks, output_path)

    print(" All chunks saved successfully!")

if __name__ == "__main__":
    process_pdfs()