from __future__ import annotations

import json
import re
from typing import Any


def build_query_from_profile(profile: dict[str, Any]) -> str:
    goals = ", ".join(profile.get("learningGoals") or []) or "a new learning goal"
    interests = ", ".join(profile.get("interests") or []) or "not specified"
    experience = profile.get("experienceLevel") or "beginner"
    pace = profile.get("preferredPace") or "balanced"
    time_commitment = profile.get("timeCommitment") or "flexible"
    background = profile.get("background") or "not provided"

    return (
        f"Create a roadmap for a {experience} learner who wants to master {goals}. "
        f"Background: {background}. Interests: {interests}. "
        f"Preferred pace: {pace}. Time commitment: {time_commitment}."
    )


def parse_llm_response(text: str) -> list[dict[str, Any]]:
    cleaned = (text or "").strip()
    if not cleaned:
        return [_fallback_step("No roadmap content was generated yet.")]

    parsed_json = _extract_json_steps(cleaned)
    if parsed_json:
        return parsed_json

    blocks = [block.strip() for block in re.split(r"\n\s*\n", cleaned) if len(block.strip()) > 20]
    if blocks:
        return [
            {
                "id": index + 1,
                "title": _infer_title(block, index + 1),
                "description": block,
                "completed": False,
            }
            for index, block in enumerate(blocks[:8])
        ]

    lines = [line.strip("-* ").strip() for line in cleaned.splitlines() if len(line.strip()) > 8]
    if lines:
        return [
            {
                "id": index + 1,
                "title": _infer_title(line, index + 1),
                "description": line,
                "completed": False,
            }
            for index, line in enumerate(lines[:8])
        ]

    return [_fallback_step(cleaned)]


def _extract_json_steps(text: str) -> list[dict[str, Any]]:
    match = re.search(r"\[[\s\S]*\]", text)
    if not match:
        return []

    try:
        payload = json.loads(match.group(0))
    except json.JSONDecodeError:
        return []

    if not isinstance(payload, list):
        return []

    steps: list[dict[str, Any]] = []
    for index, item in enumerate(payload[:8]):
        if not isinstance(item, dict):
            continue
        description = str(item.get("description") or item.get("details") or item.get("summary") or "").strip()
        if not description:
            continue
        steps.append(
            {
                "id": index + 1,
                "title": str(item.get("title") or item.get("phase") or f"Phase {index + 1}"),
                "description": description,
                "completed": bool(item.get("completed", False)),
            }
        )
    return steps


def _infer_title(text: str, step_number: int) -> str:
    first_sentence = re.split(r"[.!?\n]", text, maxsplit=1)[0].strip()
    if 4 <= len(first_sentence) <= 70:
        return first_sentence
    return f"Phase {step_number}"


def _fallback_step(message: str) -> dict[str, Any]:
    return {
        "id": 1,
        "title": "Starter Plan",
        "description": message,
        "completed": False,
    }
