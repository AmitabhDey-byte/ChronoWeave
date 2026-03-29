"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ProgressStepper } from "@/components/onboarding/ProgressStepper";
import { QuestionCard } from "@/components/onboarding/QuestionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { storeProfile } from "@/lib/profile";
import type { LearnerProfile } from "@/lib/api-client";

const tones = [
  "Supportive mentor",
  "Structured coach",
  "Fast-paced builder",
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    goal: "",
    level: "beginner",
    time: "6 hours per week",
    tone: tones[0],
    details: "",
  });
  const router = useRouter();

  const finish = () => {
    setLoading(true);

    const interests = formData.details
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    const profile: LearnerProfile = {
      experienceLevel: formData.level,
      learningGoals: formData.goal ? [formData.goal] : ["Full-stack development"],
      interests,
      preferredPace: formData.tone,
      timeCommitment: formData.time,
      background: formData.details,
    };

    storeProfile(profile);
    window.setTimeout(() => {
      router.push("/roadmap");
    }, 350);
  };

  return (
    <div className="onboarding-shell">
      <div>
        <p className="eyebrow">Learner profile</p>
        <h2 style={{ margin: 0, fontSize: "2.5rem" }}>Tell ChronoWeave how you want to grow.</h2>
        <p className="muted">These answers are stored in the browser, sent to the backend, and used to steer the RAG-grounded roadmap output.</p>
      </div>

      <ProgressStepper current={step} total={5} />

      {step === 1 && (
        <QuestionCard question="What do you want to become great at?" description="Anchor the roadmap around one clear goal.">
          <Input
            placeholder="Examples: Data science, backend engineering, UI/UX design"
            value={formData.goal}
            onChange={(event) => setFormData({ ...formData, goal: event.target.value })}
          />
        </QuestionCard>
      )}

      {step === 2 && (
        <QuestionCard question="What is your current level?" description="This changes pacing, depth, and project scope.">
          <select
            className="select-field"
            value={formData.level}
            onChange={(event) => setFormData({ ...formData, level: event.target.value })}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </QuestionCard>
      )}

      {step === 3 && (
        <QuestionCard question="How much time can you realistically give each week?" description="A stable pace is better than an impossible sprint.">
          <Input
            placeholder="Examples: 4 hours per week, 1 hour per day"
            value={formData.time}
            onChange={(event) => setFormData({ ...formData, time: event.target.value })}
          />
        </QuestionCard>
      )}

      {step === 4 && (
        <QuestionCard question="What kind of guidance do you want?" description="Choose the tone that should shape the plan.">
          <div className="choice-grid">
            {tones.map((tone) => (
              <button
                key={tone}
                type="button"
                className={`choice-card${formData.tone === tone ? " choice-card--active" : ""}`}
                onClick={() => setFormData({ ...formData, tone })}
              >
                {tone}
              </button>
            ))}
          </div>
        </QuestionCard>
      )}

      {step === 5 && (
        <QuestionCard question="Any special interests or constraints?" description="Add focus topics, prior experience, or must-learn areas.">
          <Textarea
            placeholder="Examples: I know basic Python, want stronger projects, care about cloud deployment and AI tooling"
            value={formData.details}
            onChange={(event) => setFormData({ ...formData, details: event.target.value })}
          />
        </QuestionCard>
      )}

      <div className="split-actions">
        <Button variant="secondary" onClick={() => setStep((value) => Math.max(1, value - 1))} disabled={step === 1 || loading}>
          Back
        </Button>
        <Button onClick={step === 5 ? finish : () => setStep((value) => Math.min(5, value + 1))} disabled={loading}>
          {loading ? "Saving profile..." : step === 5 ? "Generate roadmap" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
