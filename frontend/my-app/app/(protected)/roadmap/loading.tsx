"use client";

export default function RoadmapLoading() {
  return (
    <div className="roadmap-loader">
      <div className="roadmap-loader__sheet">
        <div className="roadmap-loader__header">
          <p className="eyebrow">Generating roadmap</p>
          <h2>Writing your next chapter into the notebook.</h2>
          <p className="muted">The system is gathering grounded source notes, sequencing the phases, and polishing the plan.</p>
        </div>

        <div className="roadmap-loader__thoughts">
          <div className="roadmap-loader__note">
            <strong>Profile check</strong>
            <p>Understanding your goals, interests, and time commitment.</p>
          </div>
          <div className="roadmap-loader__note">
            <strong>RAG lookup</strong>
            <p>Pulling the most relevant context from the knowledge base.</p>
          </div>
          <div className="roadmap-loader__note">
            <strong>Draft build</strong>
            <p>Composing a phase-by-phase path with projects and momentum.</p>
          </div>
        </div>

        <div className="roadmap-loader__steps">
          {[
            "Pinning down foundations",
            "Choosing the project path",
            "Highlighting practice loops",
            "Stacking portfolio signals",
            "Finalizing your roadmap sheet",
          ].map((label) => (
            <div key={label} className="roadmap-loader__card">
              <strong>{label}</strong>
              <p>Sketching a clean, scannable roadmap card for this phase.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
