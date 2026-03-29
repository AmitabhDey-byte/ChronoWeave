"use client";

import { ArrowRight, Play } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { launchStats, socialProof } from "./landing-data";

export function HeroSection() {
  const router = useRouter();

  return (
    <section className="landing-hero">
      <div className="landing-hero__content">
        <div className="eyebrow">ChronoWeave 2.0</div>
        <h1 className="landing-hero__title">Build your next chapter like it is a drop, not a deadline.</h1>
        <p className="landing-hero__copy">
          ChronoWeave turns scattered goals into an AI-powered learning studio with source-backed roadmaps, sharper
          momentum, and a flow that feels made for this generation.
        </p>

        <div className="landing-hero__proof">
          {socialProof.map((item) => (
            <span key={item} className="landing-pill">
              {item}
            </span>
          ))}
        </div>

        <div className="landing-hero__actions">
          <Button onClick={() => router.push("/onboarding")}>
            Start your era
            <ArrowRight size={16} />
          </Button>
          <Button variant="secondary" onClick={() => router.push("/Dashboard")}>
            <Play size={16} />
            Open studio
          </Button>
        </div>
      </div>

      <div className="landing-preview">
        <div className="landing-preview__badge">Now syncing your goals, backend logic, and retrieval context</div>
        <div className="landing-preview__panel">
          <div className="landing-preview__eyebrow">Launch energy</div>
          <div className="landing-preview__stats">
            {launchStats.map((stat) => (
              <div key={stat.label} className="landing-preview__stat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="landing-preview__track">
            <span />
            <span />
            <span />
          </div>
          <div className="landing-preview__callout">
            <p>Today&apos;s flow</p>
            <strong>Discover a lane, generate a roadmap, ship your first milestone.</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
