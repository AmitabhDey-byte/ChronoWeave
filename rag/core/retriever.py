from db.chroma_store import ChromaStore

class Retriever:
    def __init__(self):
        self.store = ChromaStore()

    def get_relevant_docs(self, query: str, n_results: int = 5, filters=None):
        """
        Retrieve top relevant documents from vector DB
        """

        results = self.store.query(
            query_text=query,
            n_results=n_results,
            filters=filters
        )

        documents = results.get("documents", [[]])[0]
        metadatas = results.get("metadatas", [[]])[0]

        combined = []
        for doc, meta in zip(documents, metadatas):
            combined.append({
                "text": doc,
                "metadata": meta
            })

        return combined