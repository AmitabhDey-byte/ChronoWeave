import type { LucideIcon } from "lucide-react";
import { AudioWaveform, Compass, Flame, Layers3, Orbit, Sparkles, Stars, Wand2 } from "lucide-react";

export type LandingItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const socialProof = [
  "Build roadmaps from your vibe, not just your resume",
  "AI study studio with real-source grounding",
  "Designed for momentum, not academic clutter",
];

export const highlights: LandingItem[] = [
  {
    title: "Moodboard onboarding",
    description: "Start with your energy, goals, and dream direction so the plan feels personal from minute one.",
    icon: Sparkles,
  },
  {
    title: "Stacked learning lanes",
    description: "Split your growth into sprints, projects, and habits instead of one overwhelming timeline.",
    icon: Layers3,
  },
  {
    title: "Source-backed boosts",
    description: "RAG-grounded guidance keeps the roadmap inspired without drifting into generic filler.",
    icon: Compass,
  },
];

export const featureCards: LandingItem[] = [
  {
    title: "Create your own era",
    description: "Turn 'I want to learn design and build cool stuff' into a real sequence with proof points.",
    icon: Stars,
  },
  {
    title: "From chaos to glow-up",
    description: "ChronoWeave connects onboarding, backend logic, and source retrieval into one crisp loop.",
    icon: Wand2,
  },
  {
    title: "Momentum you can feel",
    description: "Cards, stats, and bite-sized sections keep the interface easy to scan on laptop or phone.",
    icon: Flame,
  },
];

export const launchStats = [
  { value: "24/7", label: "always-on planning" },
  { value: "RAG", label: "source-aware guidance" },
  { value: "2-mode", label: "build + explore flow" },
];

export const signalCards = [
  {
    title: "Career GPS",
    subtitle: "Choose a lane and get your next move instantly.",
    icon: Orbit,
  },
  {
    title: "Focus Beats",
    subtitle: "Project-sized milestones that feel like playlists, not homework.",
    icon: AudioWaveform,
  },
];
