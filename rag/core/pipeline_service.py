from __future__ import annotations

from typing import Any

from models.hf_model import HFModels
from retriever import Retriever


class RAGPipeline:
    def __init__(self):
        self.retriever = Retriever()
        self.models = HFModels()

    def build_prompt(self, user_query: str, context_docs: list[dict], profile: dict[str, Any] | None = None) -> str:
        if context_docs:
            context_text = "\n\n".join(doc["text"] for doc in context_docs)
            context_block = f"""
The following is relevant knowledge retrieved from a career database.
Use it as grounding, but also apply your own broader knowledge:

--- Retrieved context ---
{context_text}
--- End of context ---
"""
        else:
            context_block = "(No specific documents were retrieved. Use your own knowledge.)\n"

        profile_block = ""
        if profile:
            profile_block = f"""
Learner profile:
- Experience level: {profile.get("experienceLevel", "beginner")}
- Learning goals: {", ".join(profile.get("learningGoals", [])) or "not provided"}
- Interests: {", ".join(profile.get("interests", [])) or "not provided"}
- Preferred pace: {profile.get("preferredPace", "balanced")}
- Time commitment: {profile.get("timeCommitment", "flexible")}
- Background: {profile.get("background", "not provided")}
"""

        return f"""<|system|>
You are an expert AI career mentor. You have two sources of knowledge:
1. Retrieved career documents provided below (domain-specific grounding)
2. Your own broad knowledge of industries, skills, and career paths

Always combine both. Do NOT just repeat the retrieved text. Synthesize it into a concrete action plan.
<|user|>
{context_block}
{profile_block}
Career goal: {user_query}

Generate a structured career roadmap with:
- A brief overview of the path
- Step-by-step learning path with realistic timeframes
- Suggested practice projects
- Key resources to explore
- Common mistakes to avoid

Be specific, practical, and encouraging.
<|assistant|>
"""

    def get_diagnostics(self) -> dict[str, Any]:
        docs_indexed = self.retriever.store.count()
        generator_ready = self.models.generator is not None
        return {
            "ragReady": docs_indexed > 0,
            "documentsIndexed": docs_indexed,
            "generatorReady": generator_ready,
            "generatorFallback": not generator_ready,
            "generatorError": self.models.generator_error,
        }

    def generate_preview(self, query: str, profile: dict[str, Any] | None = None) -> dict[str, Any]:
        docs = self.retriever.get_relevant_docs(query, n_results=3) if self.retriever.is_ready() else []
        goals = profile.get("learningGoals", []) if profile else []
        focus = goals[0] if goals else query
        top_source = docs[0]["metadata"].get("source", "knowledge base") if docs else "mentor guidance"

        return {
            "headline": f"Roadmap ready for {focus}",
            "summary": (
                f"ChronoWeave found {len(docs)} grounding source(s) and will tailor the plan "
                f"around {profile.get('experienceLevel', 'your current level') if profile else 'your current level'}."
            ),
            "focusAreas": self._focus_areas_from_docs(docs, profile),
            "topSource": top_source,
            "diagnostics": self.get_diagnostics(),
        }

    def generate_roadmap(self, query: str, profile: dict[str, Any] | None = None) -> dict[str, Any]:
        docs = self.retriever.get_relevant_docs(query, n_results=5) if self.retriever.is_ready() else []
        overview = self._build_overview(query, profile, docs)

        if self.models.generator is not None:
            prompt = self.build_prompt(query, docs, profile=profile)
            roadmap = self.models.generate_raw(prompt).strip()
        else:
            roadmap = self._fallback_roadmap(query, profile, docs)

        sources = [
            {
                "source": doc.get("metadata", {}).get("source", "unknown"),
                "distance": doc.get("distance"),
                "excerpt": doc.get("text", "")[:220].strip(),
            }
            for doc in docs[:5]
        ]

        return {
            "overview": overview,
            "roadmap": roadmap,
            "sources": sources,
            "diagnostics": self.get_diagnostics(),
        }

    def _build_overview(self, query: str, profile: dict[str, Any] | None, docs: list[dict]) -> str:
        experience = profile.get("experienceLevel", "beginner") if profile else "beginner"
        pace = profile.get("preferredPace", "steady") if profile else "steady"
        return (
            f"This path is tuned for a {experience} learner and a {pace} cadence. "
            f"It blends {len(docs)} retrieved knowledge source(s) with a practical progression toward {query}."
        )

    def _focus_areas_from_docs(self, docs: list[dict], profile: dict[str, Any] | None) -> list[str]:
        focus_areas: list[str] = []
        if profile:
            focus_areas.extend(goal for goal in profile.get("learningGoals", []) if goal)
            focus_areas.extend(interest for interest in profile.get("interests", []) if interest)

        for doc in docs:
            excerpt = doc.get("text", "")
            for segment in excerpt.splitlines():
                cleaned = segment.strip(" -:*")
                if 8 <= len(cleaned) <= 60:
                    focus_areas.append(cleaned)
                if len(focus_areas) >= 4:
                    break
            if len(focus_areas) >= 4:
                break

        unique_items: list[str] = []
        seen: set[str] = set()
        for item in focus_areas:
            normalized = item.lower()
            if normalized not in seen:
                seen.add(normalized)
                unique_items.append(item)

        return unique_items[:4] or ["Core fundamentals", "Hands-on practice", "Portfolio projects"]

    def _fallback_roadmap(self, query: str, profile: dict[str, Any] | None, docs: list[dict]) -> str:
        experience = profile.get("experienceLevel", "beginner") if profile else "beginner"
        time_commitment = profile.get("timeCommitment", "a manageable weekly rhythm") if profile else "a manageable weekly rhythm"
        interests = ", ".join(profile.get("interests", [])) if profile else ""
        doc_hint = docs[0]["text"][:260].replace("\n", " ") if docs else ""

        sections = [
            f"Foundation Sprint\nStart by auditing the fundamentals required for {query}. As a {experience} learner, spend the first phase building vocabulary, concepts, and one tiny proof-of-work project. Keep the cadence at {time_commitment}.",
            f"Guided Practice\nMove into structured exercises, tutorials, and mini builds. Focus on feedback loops, note-taking, and applied repetition. Prioritize topics connected to {interests or 'the main goal'} so the roadmap stays motivating.",
            "Portfolio Build\nChoose one capstone that demonstrates problem-solving, not just feature copying. Break it into milestones, document the tradeoffs, and ship visible progress every week.",
            f"Career Signal Layer\nCollect project writeups, public notes, and measurable outcomes. Use the retrieved knowledge base as reference material, especially this cue: {doc_hint or 'build toward real-world tasks and explain your decisions clearly.'}",
        ]
        return "\n\n".join(sections)
