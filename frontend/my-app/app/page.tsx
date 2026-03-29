"use client";

import { HeroSection } from "@/components/landing/HeroSection";
import { HighlightGrid } from "@/components/landing/HighlightGrid";
import { SignalStrip } from "@/components/landing/SignalStrip";


export default function LandingPage() {
  return (
    <main className="landing-shell">
      <div className="landing-frame">
        <HeroSection />
        <SignalStrip />
        <HighlightGrid />
      </div>
    </main>
  );
}
