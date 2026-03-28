from models.hf_model import HFModels
from core.retriever import Retriever
class RAGPipeline:
    def __init__(self):
        self.retriever = Retriever()
        self.models = HFModels()

    def build_prompt(self, user_query: str, context_docs: list[dict]) -> str:
        if context_docs:
            context_text = "\n\n".join([doc["text"] for doc in context_docs])
            context_block = f"""
The following is relevant knowledge retrieved from a career database.
Use it as grounding, but also apply your own broader knowledge:

--- Retrieved context ---
{context_text}
--- End of context ---
"""
        else:
            context_block = "(No specific documents were retrieved. Use your own knowledge.)\n"

        return f"""<|system|>
You are an expert AI career mentor. You have two sources of knowledge:
1. Retrieved career documents provided below (domain-specific grounding)
2. Your own broad knowledge of industries, skills, and career paths

Always combine both. Do NOT just repeat the retrieved text — synthesize it with
what you know to give the most complete, actionable advice possible.
If the retrieved context is missing something important, fill the gap yourself.
<|user|>
{context_block}
Career goal: {user_query}

Generate a structured career roadmap with:
- A brief overview of the path
- Required skills (split into: already common knowledge vs. specialized)
- Step-by-step learning path (with realistic timeframes)
- Suggested free and paid resources
- Common mistakes to avoid

Be specific, practical, and encouraging.
<|assistant|>
"""

    def generate_roadmap(self, user_query: str) -> str:
        if not self.retriever.is_ready():
            return "No documents indexed yet. Please run `python rag/embeddings.py` first."

        docs = self.retriever.get_relevant_docs(user_query, n_results=5)
        prompt = self.build_prompt(user_query, docs)

        raw = self.models.generate_raw(prompt)
        marker = "<|assistant|>"
        if marker in raw:
            return raw.split(marker)[-1].strip()
        return raw.strip()