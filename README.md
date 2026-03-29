# 🧵 ChronoWeave

> AI-powered timeline + roadmap intelligence system  
> Turning scattered data into structured, evolving career journeys.

---

## ✨ Overview

ChronoWeave is a smart system designed to generate, manage, and evolve career roadmaps over time using AI.

It combines:
- Retrieval-Augmented Generation (RAG)
- Multi-source roadmap datasets (PDF, JSON, etc.)
- FastAPI backend
- Next.js frontend

The goal is to help users navigate their career like a timeline instead of a static checklist.

---

## 🧠 Core Idea

Most roadmap tools are static.  
ChronoWeave is dynamic.

It:
- Understands user goals
- Retrieves relevant roadmap data
- Generates personalized learning paths
- Evolves recommendations over time

---

## 🏗️ Tech Stack

### Frontend
- Next.js
- Tailwind CSS
- Clerk (Authentication)

### Backend
- FastAPI
- Python

### AI / ML
- Sentence Transformers (`all-MiniLM-L6-v2`)
- ChromaDB (Vector Database)
- Custom RAG Pipeline

---

Frontend (Next.js)
↓
Backend API (FastAPI)
↓
RAG Pipeline
├── Embeddings (SentenceTransformer)
├── Vector Store (ChromaDB)
└── Retriever + Generator
↓
Roadmap Output



---

## 📂 Project Structure


ChronoWeave/
│
├── frontend/ # Next.js app
├── backend/ # FastAPI server
├── rag/
│ ├── data/ # PDFs / datasets
│ ├── embeddings/ # Vector DB
│ ├── pipeline.py
│ ├── retriever.py
│ └── hf_model.py
│
├── utils/
├── requirements.txt
└── README.md


---

## 🚀 Features

- AI-powered roadmap generation  
- Multi-PDF ingestion  
- Fast semantic search using embeddings  
- Modular RAG pipeline  
- Authentication with Clerk  
- Personalized career paths  

---

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/AmitabhDey-byte/ChronoWeave.git
cd ChronoWeave


### 2. Setup Backend
 ```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload


### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev


📊 Data Pipeline
Load PDFs or datasets
Extract text
Chunk into segments
Generate embeddings
Store in ChromaDB
Retrieve and generate responses
🧪 Example

Input:

I want to become a Data Scientist

Output:

Structured roadmap
Required skills
Learning sequence
Resources
🔮 Future Improvements
Agent-based reasoning
Progress tracking dashboard
User personalization
Multi-domain roadmap expansion
Real-time adaptive learning

👤 Author

Amitabh Dey




## ⚙️ Architecture
