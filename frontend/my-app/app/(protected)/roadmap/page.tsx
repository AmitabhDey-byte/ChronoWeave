"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookMarked, Cpu, Database, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { generateRoadmap, type RoadmapResponse } from "@/lib/api-client";
import { readStoredProfile } from "@/lib/profile";


export default function RoadmapPage() {
  const [data, setData] = useState<RoadmapResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const profile = readStoredProfile();
    if (!profile) {
      const timer = window.setTimeout(() => {
        setError("No onboarding profile found yet. Complete onboarding first.");
        setLoading(false);
      }, 0);

      return () => window.clearTimeout(timer);
    }

    generateRoadmap(profile)
      .then((response) => setData(response))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="roadmap-loader">
        <div className="roadmap-loader__sheet">
          <div className="roadmap-loader__header">
            <p className="eyebrow">Generating roadmap</p>
            <h2>Filling your notebook with the next best moves.</h2>
            <p className="muted">ChronoWeave is blending your onboarding profile, retrieval context, and roadmap structure.</p>
          </div>

          <div className="roadmap-loader__thoughts">
            <div className="roadmap-loader__note">
              <strong>Reading your vibe</strong>
              <p>Matching experience, pace, and focus areas.</p>
            </div>
            <div className="roadmap-loader__note">
              <strong>Scanning sources</strong>
              <p>Pulling grounded snippets from the knowledge base.</p>
            </div>
            <div className="roadmap-loader__note">
              <strong>Sketching phases</strong>
              <p>Turning the results into a clean learning sequence.</p>
            </div>
          </div>

          <div className="roadmap-loader__steps">
            {["Foundation sprint", "Project lane", "Portfolio signal", "Career polish"].map((item) => (
              <div key={item} className="roadmap-loader__card">
                <strong>{item}</strong>
                <p>Drafting a focused, achievable step for your notebook roadmap.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="placeholder-state">
        <h2>Roadmap unavailable</h2>
        <p className="muted">{error || "ChronoWeave could not generate a roadmap yet."}</p>
        <Link href="/onboarding">
          <Button>Complete onboarding</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="roadmap-notebook">
      <section className="roadmap-journal">
        <div className="roadmap-journal__header">
          <p className="eyebrow">Generated roadmap</p>
          <h2>{data.query}</h2>
          <p className="muted">{data.overview}</p>
        </div>

        <div className="roadmap-journal__badges">
          <div className="roadmap-badge">
            <strong>{data.steps.length} phases</strong>
            <span>broken into realistic milestones</span>
          </div>
          <div className="roadmap-badge">
            <strong>{data.sources.length} source notes</strong>
            <span>used to ground the roadmap</span>
          </div>
          <div className="roadmap-badge">
            <strong>{data.diagnostics.generatorFallback ? "Fallback mode" : "Model-backed mode"}</strong>
            <span>current roadmap generation style</span>
          </div>
        </div>
      </section>

      <div className="roadmap-grid">
        <section className="roadmap-timeline">
          {data.steps.map((step, index) => (
            <article key={step.id} className="roadmap-step">
              <div className="roadmap-step__number">{index + 1}</div>
              <p className="eyebrow">Phase {index + 1}</p>
              <h3 style={{ marginTop: 0 }}>{step.title}</h3>
              <p className="muted" style={{ marginBottom: 0, lineHeight: 1.7 }}>{step.description}</p>
            </article>
          ))}
        </section>

        <aside className="roadmap-sidepanel">
          <Card>
            <p className="eyebrow"><Sparkles size={14} style={{ marginRight: 6, verticalAlign: "text-bottom" }} />Roadmap summary</p>
            <p style={{ marginTop: 0 }}>{data.overview}</p>
          </Card>
          <Card>
            <p className="eyebrow"><Database size={14} style={{ marginRight: 6, verticalAlign: "text-bottom" }} />Retrieved sources</p>
            <div className="roadmap-source-list">
              {data.sources.length > 0 ? data.sources.map((source, index) => (
                <div key={`${source.source}-${index}`} className="roadmap-source-card">
                  <strong>{source.source}</strong>
                  <p className="muted" style={{ marginBottom: 0 }}>{source.excerpt || "No excerpt available."}</p>
                </div>
              )) : <p className="muted" style={{ margin: 0 }}>No retrieval snippets were returned for this run.</p>}
            </div>
          </Card>
          <Card>
            <p className="eyebrow"><Cpu size={14} style={{ marginRight: 6, verticalAlign: "text-bottom" }} />Diagnostics</p>
            <p className="muted">Documents indexed: {data.diagnostics.documentsIndexed}</p>
            <p className="muted">Generator mode: {data.diagnostics.generatorFallback ? "Fallback" : "Model-backed"}</p>
            <p className="muted">Notebook feel: active</p>
            <Link href="/onboarding">
              <Button variant="secondary">
                <BookMarked size={16} />
                Adjust profile
                <ArrowRight size={16} style={{ marginLeft: 8 }} />
              </Button>
            </Link>
          </Card>
        </aside>
      </div>
    </div>
  );
}
