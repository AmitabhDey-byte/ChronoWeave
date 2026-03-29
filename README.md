# ChronoWeave 🧠📚

AI-powered personalized learning roadmap platform built with Next.js, FastAPI, and RAG (Retrieval-Augmented Generation).

## 🌟 Features

- **Personalized Learning Paths**: AI-generated roadmaps based on your goals, experience, and interests
- **Interactive Onboarding**: Sliding questionnaire to understand your learning preferences
- **Real-time Recommendations**: Smart suggestions powered by RAG technology
- **Progress Tracking**: Visual analytics and learning activity feeds
- **Modern UI**: Glassmorphism design with smooth animations
- **Full-Stack Architecture**: Next.js frontend with FastAPI backend

## 🏗️ Architecture

```
ChronoWeave/
├── frontend/my-app/          # Next.js 16 frontend
│   ├── app/                  # App Router pages
│   ├── components/           # Reusable UI components
│   └── lib/                  # Utilities and types
├── backend/                  # FastAPI backend
│   ├── main.py              # FastAPI application
│   ├── rag_service.py       # RAG service wrapper
│   └── requirements.txt     # Python dependencies
├── rag/                     # RAG system (Python)
│   ├── core/                # Core RAG components
│   ├── models/              # ML models
│   └── data/                # Embeddings and processed data
└── package.json             # Root management scripts
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **Python** 3.8+
- **Git**

### 1. Clone and Setup

```bash
git clone <repository-url>
cd ChronoWeave

# Install all dependencies (frontend, backend, root)
npm run install:all
```

### 2. Set up RAG System (Optional but Recommended)

```bash
# Process documents and create embeddings
cd rag
python run.py --mode ingest
python run.py --mode embed
cd ..
```

### 3. Start Development Servers

```bash
# Start both frontend and backend simultaneously
npm run dev

# Or start individually:
npm run backend    # FastAPI server on :8000
npm run frontend   # Next.js dev server on :3000
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 📖 Usage

### For Learners

1. **Complete Onboarding**: Answer questions about your experience, goals, and preferences
2. **View Dashboard**: See personalized recommendations and learning paths
3. **Track Progress**: Monitor your learning journey with visual analytics
4. **Get AI Tips**: Receive smart learning suggestions and study advice

### For Developers

#### API Endpoints

```bash
# Health check
GET /health

# Get personalized recommendations
POST /api/recommendations
Content-Type: application/json

{
  "experienceLevel": "beginner",
  "learningGoals": ["web development"],
  "interests": ["frontend", "react"],
  "preferredPace": "moderate",
  "timeCommitment": "moderate",
  "background": "some programming experience"
}

# Generate roadmap
POST /api/roadmap
Content-Type: application/json

{
  "query": "I want to become a full-stack developer"
}
```

## 🛠️ Development

### Frontend (Next.js)

```bash
cd frontend/my-app
npm install
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
```

### Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
python run.py        # Development server with auto-reload
```

### RAG System

```bash
cd rag
python run.py --mode ingest    # Process documents
python run.py --mode embed     # Create embeddings
python run.py --mode query     # Test queries
```

## 🐳 Docker Deployment

### Backend Only

```bash
cd backend
docker-compose up --build
```

### Full Stack

```bash
# Update docker-compose.yml to include frontend service
docker-compose up --build
```

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
BACKEND_HOST=0.0.0.0
BACKEND_PORT=8000
DEBUG=True
FRONTEND_URL=http://localhost:3000
RAG_DATA_PATH=../rag/data
MODEL_NAME=sentence-transformers/all-MiniLM-L6-v2
```

**Frontend**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📊 Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **State**: React Hooks

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.8+
- **AI/ML**: Sentence Transformers, ChromaDB
- **API**: RESTful with Pydantic models
- **CORS**: Configured for frontend integration

### RAG System
- **Vector DB**: ChromaDB
- **Embeddings**: Sentence Transformers
- **Models**: Hugging Face Transformers
- **Processing**: Custom pipeline for learning content

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Powered by open-source AI models
- Inspired by the need for personalized learning

## 📞 Support

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Documentation**: See individual README files in each directory

---

**Happy Learning! 🎓✨**