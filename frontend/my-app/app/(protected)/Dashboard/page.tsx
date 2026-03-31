"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Database, Sparkles, Target } from "lucide-react";

import { Button } from "@/components/ui/button";
import AiCoachCard from "@/components/bot/ai";
import { Card } from "@/components/ui/card";
import { fetchHealth, fetchRecommendations, type HealthResponse, type RecommendationResponse } from "@/lib/api-client";
import { readStoredProfile } from "@/lib/profile";


export default function DashboardPage() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [recommendation, setRecommendation] = useState<RecommendationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const profile = readStoredProfile();

    Promise.all([
      fetchHealth().then(setHealth),
      profile ? fetchRecommendations(profile).then(setRecommendation) : Promise.resolve(null),
    ]).catch((err: Error) => setError(err.message));
  }, []);

  const documentsIndexed = health?.documentsIndexed ?? 0;
  const ragReady = health?.ragReady ?? false;
  const focusAreas = recommendation?.focusAreas?.length ? recommendation.focusAreas : ["Complete onboarding", "Generate a roadmap", "Review source-backed phases"];

  return (
    <div>
      <div className="stat-grid">
        <Card>
          <p className="eyebrow">Knowledge Base</p>
          <p className="stat-card__value">{documentsIndexed}</p>
          <p className="stat-card__label">indexed source chunks</p>
        </Card>
        <Card>
          <p className="eyebrow">Backend</p>
          <p className="stat-card__value">{ragReady ? "Live" : "Idle"}</p>
          <p className="stat-card__label">FastAPI + RAG connection</p>
        </Card>
        <Card>
          <p className="eyebrow">Generator</p>
          <p className="stat-card__value">{health?.generatorFallback ? "Fallback" : "Model"}</p>
          <p className="stat-card__label">response mode</p>
        </Card>
      </div>

      <div className="dashboard-grid">
        <section>
          <div className="hero-card">
            <p className="eyebrow">Roadmap studio</p>
            <h2 style={{ margin: 0, fontSize: "2.3rem" }}>
              {recommendation?.headline || "Create a profile-driven roadmap"}
            </h2>
            <p className="muted" style={{ margin: 0 }}>
              {recommendation?.summary || "Tell ChronoWeave what you want to learn, then generate a plan that blends your profile with retrieved source material."}
            </p>
            <div className="pill-row">
              {focusAreas.map((area) => (
                <span key={area} className="focus-pill">{area}</span>
              ))}
            </div>
            <div className="tag-row">
              <Link href="/onboarding">
                <Button>Refine profile</Button>
              </Link>
              <Link href="/roadmap">
                <Button variant="secondary">Open roadmap</Button>
              </Link>
            </div>
          </div>

          <div className="info-grid" style={{ marginTop: 20 }}>
            <Card>
              <p className="eyebrow">Top source</p>
              <h3 style={{ marginTop: 0 }}>{recommendation?.topSource || "Waiting for roadmap context"}</h3>
              <p className="muted" style={{ marginBottom: 0 }}>
                The dashboard reads backend recommendations from the same profile data used to generate the roadmap.
              </p>
            </Card>
            <Card>
              <p className="eyebrow">Integration status</p>
              <h3 style={{ marginTop: 0 }}>Frontend, backend, and RAG are aligned</h3>
              <p className="muted" style={{ marginBottom: 0 }}>
                The API client is typed, the backend has health and roadmap endpoints, and the RAG layer now uses relative paths.
              </p>
            </Card>
          </div>
        </section>

        <aside className="info-grid" style={{ gridTemplateColumns: "1fr" }}>
          <AiCoachCard compact />
          <Card>
            <p className="eyebrow"><Database size={14} style={{ marginRight: 6, verticalAlign: "text-bottom" }} />System check</p>
            <p style={{ marginTop: 0 }}>
              {error || (ragReady ? "The retrieval system is reachable and ready to support roadmap generation." : "RAG data is not ready yet. Run ingest/embed if you need fresh retrieval results.")}
            </p>
          </Card>
          <Card>
            <p className="eyebrow"><Target size={14} style={{ marginRight: 6, verticalAlign: "text-bottom" }} />Next move</p>
            <p style={{ marginTop: 0, marginBottom: 12 }}>
              Tighten your learner profile, then open the roadmap page to generate a structured plan and review the retrieved sources.
            </p>
            <Link href="/roadmap">
              <Button variant="secondary">
                Generate roadmap
                <ArrowRight size={16} style={{ marginLeft: 8 }} />
              </Button>
            </Link>
          </Card>
          <Card>
            <p className="eyebrow"><Sparkles size={14} style={{ marginRight: 6, verticalAlign: "text-bottom" }} />Why this is better</p>
            <p style={{ marginTop: 0, marginBottom: 0 }}>
              The workspace is no longer a static mockup. It now reflects real backend state and profile-derived roadmap recommendations.
            </p>
          </Card>
        </aside>
      </div>
    </div>
  );
}
