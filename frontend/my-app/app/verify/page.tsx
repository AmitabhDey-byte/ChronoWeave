"use client";

import { useRouter } from "next/navigation";
import { MailCheck } from "lucide-react";

export default function VerifyPage() {
  const router = useRouter();

  return (
    <main className="auth-shell">
      <section className="auth-frame" style={{ gridTemplateColumns: "1fr" }}>
        <div className="auth-card" style={{ maxWidth: 540, margin: "0 auto" }}>
          <div style={{ display: "grid", gap: 18, textAlign: "center", color: "var(--text-50)" }}>
            <div style={{ display: "grid", placeItems: "center" }}>
              <div className="profile-avatar">
                <MailCheck size={28} />
              </div>
            </div>
            <div>
              <h1 style={{ margin: 0 }}>Check your email</h1>
              <p className="muted" style={{ marginTop: 10 }}>
                Verification is handled by Clerk in the sign-up flow. If you were sent here, return to sign-up and
                continue from there.
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              <button className="button button--primary" type="button" onClick={() => router.push("/sign-up")}>
                Back to sign up
              </button>
              <button className="button button--secondary" type="button" onClick={() => router.push("/sign-in")}>
                Go to sign in
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
