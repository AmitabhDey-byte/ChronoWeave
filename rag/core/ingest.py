from __future__ import annotations

import json
from pathlib import Path

import pandas as pd
from pypdf import PdfReader


CORE_DIR = Path(__file__).resolve().parent
RAG_DIR = CORE_DIR.parent
RAW_DIR = RAG_DIR / "data" / "raw"
PROCESSED_CHUNKS_PATH = RAG_DIR / "data" / "processed" / "chunks.txt"

def load_pdf(input_path: str) -> str:
    reader = PdfReader(input_path)
    text = ""

    for page in reader.pages:
        content = page.extract_text()
        if content:
            text += content + "\n"

    return text
def load_csv(input_path: str) -> str:
    df = pd.read_csv(input_path)
    text = ""

    for _, row in df.iterrows():
        row_text = f"""
        Learning Path: {row.get('path_name', '')}
        Skill: {row.get('skill', '')}
        Level: {row.get('level', '')}
        Description: {row.get('description', '')}
        """

        text += row_text.strip() + "\n###\n"

    return text

def load_json(input_path: str) -> str:
    with open(input_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    text = ""

    if isinstance(data, list):
        for item in data:
            q = item.get("question", "")
            a = item.get("answer", "")

            qa_text = f"""
            Question: {q}
            Answer: {a}
            """

            text += qa_text.strip() + "\n###\n"

    return text
def chunk_text(text: str, chunk_size=500, overlap=100):
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]
        if chunk.strip() and len(chunk) > 50: 
            chunks.append(chunk.strip())

        start += chunk_size - overlap

    return chunks

def save_chunks(chunks, output_path):
    output = Path(output_path)
    output.parent.mkdir(parents=True, exist_ok=True)

    with output.open("w", encoding="utf-8") as f:
        for chunk in chunks:
            f.write(chunk + "\n---\n")

def process_files():
    input_dir = RAW_DIR
    output_path = PROCESSED_CHUNKS_PATH

    all_text = ""

    print(" Reading files from raw folder...\n")

    for file_path in input_dir.iterdir():
        file = file_path.name

        try:
            if file.endswith(".pdf"):
                print(f" Processing PDF: {file}")
                text = load_pdf(str(file_path))

            elif file.endswith(".csv"):
                print(f" Processing CSV: {file}")
                text = load_csv(str(file_path))

            elif file.endswith(".json"):
                print(f" Processing JSON: {file}")
                text = load_json(str(file_path))

            else:
                continue

            if text.strip():
                all_text += text + "\n"

        except Exception as e:
            print(f" Error processing {file}: {e}")

    if not all_text.strip():
        print(" No text extracted. Check your data files.")
        return

    print("\n Chunking text...")
    chunks = chunk_text(all_text)

    print(f" Total chunks created: {len(chunks)}")

    save_chunks(chunks, str(output_path))

    print("Chunks saved successfully!")


if __name__ == "__main__":
    process_files()
