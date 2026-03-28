import streamlit as st

from core.ingest import process_pdf
from core.embed import main as embed_data
from core.pipeline import RAGPipeline

# Initialize pipeline
rag = RAGPipeline()

st.set_page_config(page_title="AI Roadmap Generator", layout="wide")

st.title("🧠 AI Roadmap Generator")
st.write("Control your RAG system + generate roadmaps 🚀")

# -----------------------------
# SECTION 1: DATA SETUP
# -----------------------------
st.header("⚙️ Setup Knowledge Base")

col1, col2 = st.columns(2)

with col1:
    if st.button("📄 Ingest PDF"):
        with st.spinner("Processing PDF..."):
            process_pdf()
        st.success("✅ PDF processed into chunks!")

with col2:
    if st.button("🧠 Create Embeddings"):
        with st.spinner("Generating embeddings..."):
            embed_data()
        st.success("✅ Embeddings stored!")

# -----------------------------
# SECTION 2: USER INPUT
# -----------------------------
st.header("🎯 Generate Roadmap")

goal = st.text_input("Enter your goal")

experience = st.selectbox(
    "Experience Level",
    ["Beginner", "Intermediate", "Advanced"]
)

time = st.selectbox(
    "Time Commitment",
    ["3 months", "6 months", "1 year"]
)

# -----------------------------
# SECTION 3: GENERATE
# -----------------------------
if st.button("🚀 Generate Roadmap"):
    if goal:
        with st.spinner("Thinking... 🤖"):

            query = f"""
            Goal: {goal}
            Experience: {experience}
            Time: {time}
            """

            result = rag.generate_roadmap(query)

        st.success("✅ Roadmap Generated!")

        st.subheader("📍 Your Roadmap")
        st.write(result)

    else:
        st.warning("⚠️ Please enter a goal")

# -----------------------------
# FOOTER
# -----------------------------
st.markdown("---")
st.caption("Built with ❤️ using RAG + Streamlit")