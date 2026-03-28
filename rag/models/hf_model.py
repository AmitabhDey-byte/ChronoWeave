from sentence_transformers import SentenceTransformer
from transformers import pipeline

class HFModels:
    def __init__(
        self,
        embedding_model_name: str = "all-MiniLM-L6-v2",
        generation_model_name: str = "google/flan-t5-base"
    ):
        """
        Initialize Hugging Face models
        """

        self.embedder = SentenceTransformer(embedding_model_name)

        self.generator = pipeline(
            "text-generation",
            model=generation_model_name,
            max_length=512
        )

    def embed_text(self, texts):
        """
        Generate embeddings for list of texts
        """
        if isinstance(texts, str):
            texts = [texts]

        embeddings = self.embedder.encode(texts)
        return embeddings.tolist()

    def generate(self, prompt: str):
        """
        Generate text using LLM
        """
        output = self.generator(prompt)
        return output[0]["generated_text"]