import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

const systemPrompt = `
You are a warm, calm mental health support chatbot for a wellness feature inside a website.
Your role is to listen, validate emotions, help users de-escalate frustration, and offer grounded coping ideas.

Rules:
- Be empathetic, gentle, and non-judgmental.
- Keep replies concise, supportive, and conversational.
- Do not mention roadmaps, learning plans, embeddings, retrieval, RAG, or technical systems.
- Do not claim to be a licensed therapist, doctor, or crisis service.
- Do not give medical diagnoses.
- If the user sounds in immediate danger, suicidal, self-harming, violent, or unable to stay safe, clearly encourage them to contact local emergency services or a crisis hotline immediately and reach out to a trusted nearby person now.
- When appropriate, suggest practical coping steps like breathing, journaling, taking a short walk, drinking water, resting, or naming feelings.
- Ask at most one gentle follow-up question when it helps.
`;

function buildFallbackReply(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("overwhelm") || normalized.includes("overwhelmed")) {
    return "That sounds like a lot to carry at once. Let's shrink the moment: what is the one part of this situation that feels heaviest right now? If you can, put both feet on the floor and take one slow breath before answering.";
  }

  if (normalized.includes("angry") || normalized.includes("frustrat") || normalized.includes("annoy")) {
    return "It makes sense that you're frustrated. Before we try to solve it, let the feeling exist for a second. What happened that pushed you over the edge today? If it helps, describe just the last moment that really got to you.";
  }

  if (normalized.includes("sad") || normalized.includes("cry") || normalized.includes("hurt")) {
    return "I'm really sorry you're carrying this right now. You don't have to tidy it up for me. If you want, tell me whether this feels more like sadness, disappointment, loneliness, or something else.";
  }

  if (
    normalized.includes("suicide") ||
    normalized.includes("kill myself") ||
    normalized.includes("hurt myself") ||
    normalized.includes("self harm")
  ) {
    return "I'm really glad you said that. Please contact local emergency services or a crisis hotline right now, and if possible reach out to a trusted person nearby immediately so you are not alone with this. If you're in the US or Canada, call or text 988 now.";
  }

  return "I'm here with you. It sounds like something is weighing on you, and we can take it one piece at a time. Tell me what happened, or if that's too much, tell me what you're feeling in this exact moment.";
}

function buildPrompt(history: ChatMessage[], message: string) {
  const normalizedHistory = history
    .slice(-8)
    .map((entry) => `${entry.role === "assistant" ? "Mentor" : "User"}: ${entry.text}`)
    .join("\n");

  return `${systemPrompt}\n\nConversation so far:\n${normalizedHistory || "No prior messages."}\nUser: ${message}\nMentor:`;
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = (await request.json()) as {
      message?: string;
      history?: ChatMessage[];
    };

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { reply: buildFallbackReply(message) },
        { status: 200 },
      );
    }

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const client = new GoogleGenerativeAI(apiKey);
    const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(buildPrompt(history || [], message));
    const reply = result.response.text().trim();

    if (!reply) {
      return NextResponse.json(
        { reply: buildFallbackReply(message) },
        { status: 200 },
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Mental health chatbot error:", error);
    return NextResponse.json(
      { reply: buildFallbackReply(""), error: "The chatbot is temporarily unavailable. Please try again." },
      { status: 200 },
    );
  }
}
