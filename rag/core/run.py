import argparse

from ingest import process_files
from embed import main as embed_data
from pipeline_service import RAGPipeline


def run_ingest():
    print("\n Running ingestion...")
    process_files()
    print(" Ingestion complete!\n")


def run_embed():
    print("\n Creating embeddings...")
    embed_data()
    print(" Embedding complete!\n")


def run_query(query):
    print("\n Running query...\n")

    rag = RAGPipeline()
    result = rag.generate_roadmap(query)

    print(" GENERATED ROADMAP:\n")
    print(result)
    print("\n Done!\n")


def main():
    parser = argparse.ArgumentParser(description="RAG System Controller")

    parser.add_argument(
        "--mode",
        type=str,
        required=True,
        choices=["ingest", "embed", "query", "all"],
        help="Choose what to run"
    )
    parser.add_argument(
        "--query",
        type=str,
       help="Query for roadmap generation"
    )
    args = parser.parse_args()
    if args.mode == "ingest":
        run_ingest()
    elif args.mode == "embed":
        run_embed()

    elif args.mode == "query":
        if not args.query:
            print("Please provide a query using --query")
            return
        run_query(args.query)

    elif args.mode == "all":
        run_ingest()
        run_embed()

        if args.query:
            run_query(args.query)
        else:
            print("No query provided, skipping generation")


if __name__ == "__main__":
    main()
