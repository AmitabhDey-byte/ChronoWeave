"use client";

import { useMemo, useState } from "react";
import { Loader2, Send, ShieldAlert, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

const starterPrompts = [
  "I feel overwhelmed and I don't know where to start.",
  "Can you help me calm down after a frustrating day?",
  "I need someone to talk to without feeling judged.",
];

const initialMessages: ChatMessage[] = [
  {
    role: "assistant",
    text: "Hi, I'm here to listen. You can vent, sort through a hard moment, or ask for gentle help thinking about what to do next.",
  },
];

function buildLocalReply(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("overwhelm") || normalized.includes("overwhelmed")) {
    return "That sounds really heavy. Let's make this moment smaller together. What feels like the hardest part right now? If you can, rest your feet on the floor and take one slow breath before answering.";
  }

  if (normalized.includes("angry") || normalized.includes("frustrat") || normalized.includes("annoy")) {
    return "It makes sense that you're frustrated. You don't need to be perfectly calm first. What happened that hit you the hardest? You can say it exactly as it felt.";
  }

  if (normalized.includes("sad") || normalized.includes("hurt") || normalized.includes("cry")) {
    return "I'm sorry you're sitting with that. You don't need to make it sound neat here. Do you want to tell me what happened, or just name the feeling first?";
  }

  if (
    normalized.includes("suicide") ||
    normalized.includes("kill myself") ||
    normalized.includes("hurt myself") ||
    normalized.includes("self harm")
  ) {
    return "I'm really glad you said that out loud. Please contact local emergency services or a crisis hotline right now and reach out to a trusted person nearby immediately so you are not alone with this. If you're in the US or Canada, call or text 988 now.";
  }

  return "I'm here with you. Tell me what happened, or if that's too much, tell me what you're feeling in this exact moment and we'll take it one step at a time.";
}

export default function MentalHealthChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSend = draft.trim().length > 0 && !isSending;

  const helperText = useMemo(
    () =>
      "This chatbot offers supportive conversation and coping help, but it is not emergency care. If you are in immediate danger or may harm yourself or someone else, contact local emergency services or a crisis hotline right now.",
    [],
  );

  const sendMessage = async (messageText: string) => {
    const trimmed = messageText.trim();
    if (!trimmed || isSending) {
      return;
    }

    const nextMessages = [...messages, { role: "user" as const, text: trimmed }];
    setMessages(nextMessages);
    setDraft("");
    setError(null);
    setIsSending(true);

    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 8000);

      const response = await fetch("/api/mental-health-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          message: trimmed,
          history: messages,
        }),
      });
      window.clearTimeout(timeout);

      const payload = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok || !payload.reply) {
        throw new Error(payload.error || "The chatbot could not respond right now.");
      }

      setMessages([...nextMessages, { role: "assistant", text: payload.reply }]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "The chatbot could not respond right now.";
      setError(message);
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          text: buildLocalReply(trimmed),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = async () => {
    await sendMessage(draft);
  };

  return (
    <section className="mental-chat">
      <div className="mental-chat__header">
        <div>
          <p className="eyebrow">Support space</p>
          <h3>Mental health mentor chatbot</h3>
          <p className="muted">
            A calm place to talk through frustration, stress, overthinking, and emotionally heavy days.
          </p>
        </div>
        <div className="mental-chat__badge">
          <Sparkles size={16} />
          Private-feeling support
        </div>
      </div>

      <div className="mental-chat__notice">
        <ShieldAlert size={18} />
        <p>{helperText}</p>
      </div>

      <div className="mental-chat__messages">
        {messages.map((message, index) => (
          <article
            key={`${message.role}-${index}`}
            className={`mental-chat__message mental-chat__message--${message.role}`}
          >
            <span className="mental-chat__role">
              {message.role === "assistant" ? "Mentor" : "You"}
            </span>
            <p>{message.text}</p>
          </article>
        ))}
        {isSending ? (
          <article className="mental-chat__message mental-chat__message--assistant">
            <span className="mental-chat__role">Mentor</span>
            <p className="mental-chat__typing">
              <Loader2 size={16} className="mental-chat__spinner" />
              Thinking with you...
            </p>
          </article>
        ) : null}
      </div>

      <div className="mental-chat__prompts">
        {starterPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            className="tag mental-chat__prompt"
            onClick={() => void sendMessage(prompt)}
            disabled={isSending}
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className="mental-chat__composer">
        <Textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Tell the chatbot what you're feeling or what happened today..."
          className="mental-chat__input"
          disabled={isSending}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void handleSubmit();
            }
          }}
        />
        <div className="mental-chat__actions">
          {error ? <p className="mental-chat__error">{error}</p> : <span className="muted">Press Enter to send, Shift+Enter for a new line.</span>}
          <Button onClick={() => void handleSubmit()} disabled={!canSend}>
            <Send size={16} />
            Send
          </Button>
        </div>
      </div>
    </section>
  );
}
