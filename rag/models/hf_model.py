from sentence_transformers import SentenceTransformer
from transformers import pipeline


class HFModels:
    def __init__(
        self,
        embedding_model_name: str = "all-MiniLM-L6-v2",
        generation_model_name: str = "TinyLlama/TinyLlama-1.1B-Chat-v1.0",
    ):
        print(f"[HFModels] Loading embedder: {embedding_model_name}")
        self.embedder = SentenceTransformer(embedding_model_name)

        print(f"[HFModels] Loading generator: {generation_model_name}")
        self.generator = pipeline(
            "text-generation",
            model=generation_model_name,
            device=-1,
            max_new_tokens=512,
            do_sample=True,
            temperature=0.7,
            top_p=0.9,
            repetition_penalty=1.15,  
        )

        print("[HFModels] Ready.")


    def embed_text(self, texts: str | list[str]) -> list[list[float]]:
        """
        Embed one or more texts.
        Always returns a list of embedding vectors (list of lists).
        """
        if isinstance(texts, str):
            texts = [texts]
        return self.embedder.encode(texts, normalize_embeddings=True).tolist()


    def generate_raw(self, full_prompt: str) -> str:
        """
        Run generation on an already-formatted prompt.
        Strips the echoed prompt from the output and returns only the new text.
        Use this when the caller (e.g. RAGPipeline) owns the full prompt template.
        """
        output = self.generator(full_prompt)
        full_text = output[0]["generated_text"]
        return self._strip_prompt(full_text, full_prompt)

    def generate(self, user_message: str, system_message: str | None = None) -> str:
        """
        Convenience wrapper for simple one-off calls.
        Wraps the message in TinyLlama's chat template automatically.
        Optionally accepts a custom system message.
        """
        system = system_message or (
            "You are a knowledgeable AI career mentor. "
            "Give practical, specific, and encouraging advice. "
            "Draw on your broad knowledge of industries, roles, and career paths."
        )

        prompt = self._build_chat_prompt(system, user_message)
        output = self.generator(prompt)
        full_text = output[0]["generated_text"]
        return self._strip_prompt(full_text, prompt)


    def _build_chat_prompt(self, system: str, user: str) -> str:
        """Format a prompt using TinyLlama's chat template."""
        return (
            f"<|system|>\n{system}\n"
            f"<|user|>\n{user}\n"
            f"<|assistant|>\n"
        )

    def _strip_prompt(self, full_text: str, prompt: str) -> str:
        """
        Remove the echoed prompt from generated output.
        TinyLlama (and most chat models) echo the full input before the reply.
        Strategy 1: split on <|assistant|> marker.
        Strategy 2: strip the prompt string directly if marker isn't present.
        """
        marker = "<|assistant|>"
        if marker in full_text:
            reply = full_text.split(marker)[-1].strip()
            if reply:
                return reply
            
        if full_text.startswith(prompt):
            return full_text[len(prompt):].strip()

        return full_text.strip()