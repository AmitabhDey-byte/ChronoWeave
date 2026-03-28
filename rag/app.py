import streamlit as st
import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from core.pipeline import RAGPipeline

# ── Page config ────────────────────────────────────────────────────────────────
st.set_page_config(
    page_title="Career Roadmap AI",
    page_icon="🗺️",
    layout="centered",
    initial_sidebar_state="collapsed",
)

# ── Custom CSS ─────────────────────────────────────────────────────────────────
st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

html, body, [class*="css"] {
    font-family: 'DM Sans', sans-serif;
}

/* Hide default streamlit chrome */
#MainMenu, footer, header { visibility: hidden; }
.block-container { padding-top: 2rem; padding-bottom: 2rem; max-width: 760px; }

/* Background */
.stApp {
    background: #0a0a0f;
    color: #e8e6e0;
}

/* Hero heading */
.hero-title {
    font-family: 'Syne', sans-serif;
    font-size: 3rem;
    font-weight: 800;
    line-height: 1.1;
    background: linear-gradient(135deg, #e8e6e0 0%, #9b8cff 50%, #ff6b6b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.25rem;
}

.hero-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    color: #6b6880;
    font-weight: 300;
    letter-spacing: 0.02em;
    margin-bottom: 2.5rem;
}

/* Tag pills */
.tag-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 2rem;
}
.tag {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 4px 12px;
    border-radius: 100px;
    border: 1px solid;
}
.tag-purple { color: #9b8cff; border-color: #9b8cff33; background: #9b8cff11; }
.tag-red    { color: #ff6b6b; border-color: #ff6b6b33; background: #ff6b6b11; }
.tag-teal   { color: #5dcaa5; border-color: #5dcaa533; background: #5dcaa511; }

/* Text area */
.stTextArea textarea {
    background: #13121a !important;
    border: 1px solid #2a2838 !important;
    border-radius: 12px !important;
    color: #e8e6e0 !important;
    font-family: 'DM Sans', sans-serif !important;
    font-size: 0.95rem !important;
    line-height: 1.6 !important;
    padding: 1rem !important;
    transition: border-color 0.2s;
}
.stTextArea textarea:focus {
    border-color: #9b8cff !important;
    box-shadow: 0 0 0 3px #9b8cff18 !important;
}
.stTextArea label { display: none !important; }

/* Button */
.stButton > button {
    background: linear-gradient(135deg, #9b8cff, #7c6dff) !important;
    color: #fff !important;
    font-family: 'Syne', sans-serif !important;
    font-weight: 600 !important;
    font-size: 0.9rem !important;
    letter-spacing: 0.04em !important;
    border: none !important;
    border-radius: 10px !important;
    padding: 0.65rem 2rem !important;
    width: 100% !important;
    transition: opacity 0.2s, transform 0.15s !important;
    cursor: pointer !important;
}
.stButton > button:hover {
    opacity: 0.88 !important;
    transform: translateY(-1px) !important;
}
.stButton > button:active {
    transform: translateY(0px) !important;
}

/* Result card */
.result-card {
    background: #13121a;
    border: 1px solid #2a2838;
    border-radius: 16px;
    padding: 1.75rem 2rem;
    margin-top: 1.5rem;
    line-height: 1.8;
    font-size: 0.95rem;
    color: #c8c5be;
    white-space: pre-wrap;
    word-wrap: break-word;
}
.result-label {
    font-family: 'Syne', sans-serif;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #9b8cff;
    margin-bottom: 0.75rem;
}

/* Example chips */
.example-label {
    font-size: 0.75rem;
    color: #4a4860;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
}

/* Divider */
.divider {
    border: none;
    border-top: 1px solid #1e1c2a;
    margin: 2rem 0;
}

/* Spinner override */
.stSpinner > div {
    border-top-color: #9b8cff !important;
}

/* Source docs */
.source-item {
    background: #0f0e16;
    border-left: 3px solid #9b8cff44;
    border-radius: 0 8px 8px 0;
    padding: 0.6rem 1rem;
    margin-bottom: 0.5rem;
    font-size: 0.82rem;
    color: #6b6880;
    font-family: 'DM Sans', sans-serif;
}

/* History item */
.history-item {
    background: #0f0e16;
    border: 1px solid #1e1c2a;
    border-radius: 10px;
    padding: 1rem 1.25rem;
    margin-bottom: 0.75rem;
    cursor: pointer;
    transition: border-color 0.2s;
}
.history-item:hover { border-color: #9b8cff44; }
.history-q {
    font-size: 0.85rem;
    color: #9b8cff;
    font-weight: 500;
    margin-bottom: 0.3rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.history-preview {
    font-size: 0.78rem;
    color: #4a4860;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Selectbox */
.stSelectbox > div > div {
    background: #13121a !important;
    border-color: #2a2838 !important;
    color: #e8e6e0 !important;
    border-radius: 10px !important;
}
</style>
""", unsafe_allow_html=True)


# ── Session state ──────────────────────────────────────────────────────────────
if "pipeline" not in st.session_state:
    st.session_state.pipeline = None
if "history" not in st.session_state:
    st.session_state.history = []
if "query" not in st.session_state:
    st.session_state.query = ""


# ── Load pipeline (cached) ─────────────────────────────────────────────────────
@st.cache_resource(show_spinner=False)
def load_pipeline():
    return RAGPipeline()


# ── Hero ───────────────────────────────────────────────────────────────────────
st.markdown('<div class="hero-title">Career Roadmap</div>', unsafe_allow_html=True)
st.markdown('<div class="hero-sub">AI-powered paths built for where you\'re actually headed.</div>', unsafe_allow_html=True)

st.markdown("""
<div class="tag-row">
  <span class="tag tag-purple">RAG-powered</span>
  <span class="tag tag-red">TinyLlama</span>
  <span class="tag tag-teal">ChromaDB</span>
</div>
""", unsafe_allow_html=True)


# ── Sidebar: history ───────────────────────────────────────────────────────────
with st.sidebar:
    st.markdown("### Past roadmaps")
    if not st.session_state.history:
        st.caption("Nothing yet — generate your first roadmap.")
    for i, item in enumerate(reversed(st.session_state.history)):
        st.markdown(f"""
        <div class="history-item">
          <div class="history-q">{item['query'][:60]}{'…' if len(item['query']) > 60 else ''}</div>
          <div class="history-preview">{item['answer'][:80]}…</div>
        </div>
        """, unsafe_allow_html=True)


# ── Examples ───────────────────────────────────────────────────────────────────
EXAMPLES = [
    "I want to become a machine learning engineer in 1 year",
    "How do I transition from marketing to product management?",
    "I'm a fresh grad — what's the fastest path to a data analyst role?",
    "I want to go from junior dev to staff engineer",
]

st.markdown('<div class="example-label">Try an example</div>', unsafe_allow_html=True)
cols = st.columns(2)
for i, example in enumerate(EXAMPLES):
    if cols[i % 2].button(example, key=f"ex_{i}"):
        st.session_state.query = example
        st.rerun()


st.markdown('<hr class="divider">', unsafe_allow_html=True)


# ── Input ──────────────────────────────────────────────────────────────────────
query = st.text_area(
    label="career goal",
    placeholder="Describe your career goal, current skills, or where you want to be in 1–3 years…",
    value=st.session_state.query,
    height=110,
    key="query_input",
)

generate_clicked = st.button("Generate roadmap →")


# ── Generate ───────────────────────────────────────────────────────────────────
if generate_clicked:
    if not query.strip():
        st.warning("Enter a career goal first.")
    else:
        # load model on first run
        if st.session_state.pipeline is None:
            with st.spinner("Loading models… (first run takes ~30s)"):
                st.session_state.pipeline = load_pipeline()

        with st.spinner("Building your roadmap…"):
            try:
                result = st.session_state.pipeline.generate_roadmap(query)

                # strip echoed prompt if present (TinyLlama safety net)
                if "<|assistant|>" in result:
                    result = result.split("<|assistant|>")[-1].strip()

                # store in history
                st.session_state.history.append({"query": query, "answer": result})
                st.session_state.query = ""

                # render result
                st.markdown('<div class="result-label">Your roadmap</div>', unsafe_allow_html=True)
                st.markdown(f'<div class="result-card">{result}</div>', unsafe_allow_html=True)

                # show retrieved sources if available
                try:
                    docs = st.session_state.pipeline.retriever.get_relevant_docs(query, n_results=3)
                    if docs:
                        with st.expander("Retrieved sources", expanded=False):
                            for doc in docs:
                                meta = doc.get("metadata", {})
                                label = meta.get("source", "doc") + " · " + meta.get("type", "")
                                preview = doc["text"][:160] + "…"
                                st.markdown(
                                    f'<div class="source-item"><strong>{label}</strong><br>{preview}</div>',
                                    unsafe_allow_html=True,
                                )
                except Exception:
                    pass  # sources are best-effort

            except Exception as e:
                st.error(f"Something went wrong: {e}")