from db.chroma_store import ChromaStore


class Retriever:
    def __init__(self, store: ChromaStore | None = None):
        self.store = store or ChromaStore()

    def get_relevant_docs(
        self,
        query: str,
        n_results: int = 5,
        filters: dict | None = None,
    ) -> list[dict]:
        """
        Retrieve the top-n most relevant documents for a query.
        Returns a list of dicts: [{"text": str, "metadata": dict, "distance": float}, ...]
        Returns [] if the store is empty or anything goes wrong.
        """
        if not query or not query.strip():
            print("[Retriever] Empty query — skipping retrieval.")
            return []

        results = self.store.query(
            query_text=query.strip(),
            n_results=n_results,
            filters=filters,
        )

        if not results:
            print("[Retriever] No results returned from store.")
            return []

        print(f"[Retriever] Retrieved {len(results)} docs for query: '{query[:60]}'")
        return results

    def is_ready(self) -> bool:
        """Returns True if the collection has at least one document indexed."""
        return self.store.count() > 0