import Image from "next/image";
import Link from "next/link";
import { MessageSquare, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type AiCoachCardProps = {
  compact?: boolean;
};

export default function AiCoachCard({ compact = false }: AiCoachCardProps) {
  return (
    <Card className={`ai-coach-card${compact ? " ai-coach-card--compact" : ""}`}>
      <div className="ai-coach-card__visual">
        <div className="ai-coach-card__orb">
          <Image
            src="/bot.png"
            alt="ChronoWeave chatbot"
            fill
            sizes="80px"
            className="ai-coach-card__image"
          />
        </div>
        <span className="tag">
          <Sparkles size={14} />
          AI companion
        </span>
      </div>

      <div className="ai-coach-card__body">
        <p className="eyebrow">Wellness chatbot</p>
        <h3>A listening space for stress, frustration, and emotional overload</h3>
        <p className="muted">
          Open an independent support chat that listens, helps you slow down, and offers gentle coping guidance when life feels heavy.
        </p>
      </div>

      <div className="ai-coach-card__prompts">
        {["I need to vent", "Help me calm down", "I feel overwhelmed"].map((prompt) => (
          <span key={prompt} className="tag">{prompt}</span>
        ))}
      </div>

      <Link href="/aibot">
        <Button variant={compact ? "secondary" : "primary"}>
          <MessageSquare size={16} />
          Open chatbot
        </Button>
      </Link>
    </Card>
  );
}
