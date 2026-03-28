import os
import chromadb
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer


class ChromaStore:
    def __init__(
        self,
        persist_directory: str = "rag/data/embeddings",
        collection_name: str = "roadmap_data",
        embedding_model: str = "all-MiniLM-L6-v2",
    ):
        """
        Initialize Chroma DB client and embedding model
        """

        self.persist_directory = persist_directory
        self.collection_name = collection_name

        # Create directory if not exists
        os.makedirs(self.persist_directory, exist_ok=True)

        # Initialize Chroma client
        self.client = chromadb.Client(
            Settings(
                persist_directory=self.persist_directory,
                anonymized_telemetry=False
            )
        )
        self.collection = self.client.get_or_create_collection(
            name=self.collection_name
        )
        self.embedder = SentenceTransformer(embedding_model)

    def add_documents(self, documents):
        """
        Add documents to ChromaDB

        documents = [
            {
                "id": "1",
                "text": "Learn Python basics...",
                "metadata": {"career": "AI Engineer"}
            }
        ]
        """

        ids = []
        texts = []
        metadatas = []
        embeddings = []

        for doc in documents:
            ids.append(doc["id"])
            texts.append(doc["text"])
            metadatas.append(doc.get("metadata", {}))
        embeddings = self.embedder.encode(texts).tolist()
        self.collection.add(
            ids=ids,
            documents=texts,
            metadatas=metadatas,
            embeddings=embeddings
        )

        print(f"Added {len(ids)} documents to ChromaDB")

    def query(self, query_text, n_results=5, filters=None):
        """
        Query similar documents
        """

        query_embedding = self.embedder.encode(query_text).tolist()

        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=n_results,
            where=filters  # metadata filtering
        )

        return results

    def delete_all(self):
        """
        Delete entire collection (use carefully)
        """
        self.client.delete_collection(self.collection_name)
        print("🗑️ Collection deleted")

    def persist(self):
        """
        Persist data to disk
        """
        self.client.persist()
        print( "Data persisted successfully")