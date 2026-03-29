import type { ReactNode } from "react";
import Link from "next/link";
import { AudioWaveform, ShieldCheck, Sparkles, Stars } from "lucide-react";

export function AuthShell({
  title,
  subtitle,
  alternateLabel,
  alternateHref,
  alternateText,
  children,
}: {
  title: string;
  subtitle: string;
  alternateLabel: string;
  alternateHref: string;
  alternateText: string;
  children: ReactNode;
}) {
  return (
    <main className="auth-shell">
      <section className="auth-frame">
        <div className="auth-story">
          <div className="eyebrow">ChronoWeave Access</div>
          <h1>{title}</h1>
          <p>{subtitle}</p>

          <div className="auth-story__chips">
            <span className="landing-pill">
              <Sparkles size={14} />
              personalized studio
            </span>
            <span className="landing-pill">
              <ShieldCheck size={14} />
              protected learner data
            </span>
            <span className="landing-pill">
              <AudioWaveform size={14} />
              roadmap momentum
            </span>
          </div>

          <div className="auth-story__feature">
            <Stars size={18} />
            <div>
              <strong>Your progress, preferences, and roadmap vibe stay linked to one identity.</strong>
              <p>Sign in once and keep your profile, learning settings, and studio flow synced.</p>
            </div>
          </div>

          <p className="auth-story__switch">
            {alternateText} <Link href={alternateHref}>{alternateLabel}</Link>
          </p>
        </div>

        <div className="auth-card">{children}</div>
      </section>
    </main>
  );
}
