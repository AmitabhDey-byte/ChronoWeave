from transformers import pipeline
from core.retriever import Retriever

class RAGPipeline:
    def __init__(self):
        self.retriever = Retriever()

        # Simple text generation model
        self.generator = pipeline(
            "text-generation",
            model="google/flan-t5-base",
            max_length=512
        )

    def build_prompt(self, user_query, context_docs):
        context_text = "\n\n".join([doc["text"] for doc in context_docs])

        prompt = f"""
You are an AI career mentor.

User goal:
{user_query}

Relevant knowledge:
{context_text}

Generate a structured roadmap with:
- Required skills
- Step-by-step learning path
- Suggested resources
- Timeline (beginner to advanced)

Make it clear and beginner-friendly.
"""

        return prompt

    def generate_roadmap(self, user_query: str):
        # Step 1: Retrieve context
        docs = self.retriever.get_relevant_docs(user_query, n_results=5)

        # Step 2: Build prompt
        prompt = self.build_prompt(user_query, docs)

        # Step 3: Generate output
        response = self.generator(prompt)[0]["generated_text"]

        return response