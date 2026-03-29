from __future__ import annotations

from pathlib import Path

import chromadb
from sentence_transformers import SentenceTransformer


CORE_DIR = Path(__file__).resolve().parent.parent
RAG_DIR = CORE_DIR.parent
DEFAULT_EMBEDDINGS_DIR = RAG_DIR / "data" / "embeddings"


class ChromaStore:
    def __init__(
        self,
        persist_directory: str | None = None,
        collection_name: str = "roadmap_data",
        embedding_model: str = "all-MiniLM-L6-v2",
        embedder=None,
    ):
        self.persist_directory = str(Path(persist_directory) if persist_directory else DEFAULT_EMBEDDINGS_DIR)
        self.collection_name = collection_name

        Path(self.persist_directory).mkdir(parents=True, exist_ok=True)

        self.client = chromadb.PersistentClient(path=self.persist_directory)
        self.collection = self.client.get_or_create_collection(
            name=self.collection_name,
            metadata={"hnsw:space": "cosine"},
        )

        self.embedder = embedder or SentenceTransformer(embedding_model)

        print(f"[ChromaStore] Collection '{collection_name}' ready. "
              f"Docs indexed: {self.collection.count()}")

    def add_documents(self, documents: list[dict]):
        """
        Upsert documents into ChromaDB.
        Each document must have: id (str), text (str), metadata (dict, optional)
        """
        if not documents:
            print("[ChromaStore] No documents to add.")
            return

        ids       = [doc["id"] for doc in documents]
        texts     = [doc["text"] for doc in documents]
        metadatas = [doc.get("metadata", {}) for doc in documents]
        embeddings = self.embedder.encode(texts, show_progress_bar=True).tolist()

        self.collection.upsert(
            ids=ids,
            documents=texts,
            metadatas=metadatas,
            embeddings=embeddings,
        )
        print(f"[ChromaStore] Upserted {len(ids)} documents. "
              f"Total in collection: {self.collection.count()}")

    def query(
        self,
        query_text: str,
        n_results: int = 5,
        filters: dict | None = None,
    ) -> list[dict]:
        """
        Query the collection and return a clean list of dicts:
            [{"text": str, "metadata": dict, "distance": float}, ...]
        Returns an empty list if the collection is empty or query fails.
        """
        count = self.collection.count()
        if count == 0:
            print("[ChromaStore] Collection is empty — run embeddings.py first.")
            return []
        n_results = min(n_results, count)
        embedding = self.embedder.encode([query_text])[0].tolist()

        query_kwargs: dict = {
            "query_embeddings": [embedding],  
            "n_results": n_results,
            "include": ["documents", "metadatas", "distances"],
        }
        if filters:
            query_kwargs["where"] = filters

        try:
            raw = self.collection.query(**query_kwargs)
        except Exception as e:
            print(f"[ChromaStore] Query failed: {e}")
            return []

        docs      = (raw.get("documents")  or [[]])[0]
        metas     = (raw.get("metadatas")  or [[]])[0]
        distances = (raw.get("distances")  or [[]])[0]

        return [
            {"text": doc, "metadata": meta, "distance": dist}
            for doc, meta, dist in zip(docs, metas, distances)
        ]
    def count(self) -> int:
        return self.collection.count()
    def delete_all(self):
        self.client.delete_collection(self.collection_name)
        # recreate so the object stays usable
        self.collection = self.client.get_or_create_collection(
            name=self.collection_name,
            metadata={"hnsw:space": "cosine"},
        )
        print("[ChromaStore] Collection deleted and recreated.")
    def persist(self):
        pass
    
