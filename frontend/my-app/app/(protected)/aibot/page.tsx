import { BookOpen, HeartHandshake, MessageSquare, Sparkles } from "lucide-react";
import Link from "next/link";

import AiCoachCard from "@/components/bot/ai";
import MentalHealthChat from "@/components/bot/MentalHealthChat";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const starterQuestions = [
  "I keep replaying a frustrating conversation in my head.",
  "I'm emotionally exhausted and I don't know what I need.",
  "Can you help me calm down without judging me?",
];

export default function AiBotPage() {
  return (
    <div className="bot-page">
      <section className="hero-card">
        <p className="eyebrow">Wellness support</p>
        <h2 style={{ margin: 0, fontSize: "2.2rem" }}>A standalone chatbot that listens and helps you process hard moments</h2>
        <p className="muted" style={{ margin: 0 }}>
          This feature is separate from the roadmap tools. It is here for emotional support, reflection, and gentle guidance when users feel stressed, frustrated, or overwhelmed.
        </p>
        <div className="pill-row">
          <span className="focus-pill">Emotional support</span>
          <span className="focus-pill">Calming prompts</span>
          <span className="focus-pill">Non-judgmental listening</span>
        </div>
        <div className="tag-row">
          <Link href="/Dashboard">
            <Button variant="secondary">
              <BookOpen size={16} />
              Back to dashboard
            </Button>
          </Link>
        </div>
      </section>

      <div className="dashboard-grid" style={{ marginTop: 20 }}>
        <section>
          <MentalHealthChat />
        </section>

        <aside className="bot-sidepanel">
          <AiCoachCard compact />
          <Card>
            <p className="eyebrow"><MessageSquare size={14} style={{ marginRight: 6, verticalAlign: "text-bottom" }} />Starter prompts</p>
            <div className="bot-prompt-list">
              {starterQuestions.map((question) => (
                <div key={question} className="source-card">
                  <strong>{question}</strong>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <p className="eyebrow"><HeartHandshake size={14} style={{ marginRight: 6, verticalAlign: "text-bottom" }} />Best use</p>
            <p style={{ marginTop: 0, marginBottom: 0 }}>
              Use this chatbot when someone needs to vent, regulate emotions, untangle a frustrating situation, or feel heard for a few minutes.
            </p>
          </Card>
          <Card>
            <p className="eyebrow"><Sparkles size={14} style={{ marginRight: 6, verticalAlign: "text-bottom" }} />Tone</p>
            <p style={{ marginTop: 0, marginBottom: 0 }}>
              The responses are designed to feel calm, supportive, and practical rather than clinical or robotic.
            </p>
          </Card>
        </aside>
      </div>
    </div>
  );
}
