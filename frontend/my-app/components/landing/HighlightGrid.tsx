import { featureCards, highlights } from "./landing-data";

export function HighlightGrid() {
  return (
    <section className="landing-grid">
      <div className="landing-stack">
        <div className="eyebrow">Built for the scroll generation</div>
        <div className="landing-feature-list">
          {highlights.map(({ title, description, icon: Icon }) => (
            <article key={title} className="landing-feature">
              <div className="landing-feature__icon">
                <Icon size={20} />
              </div>
              <div>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="landing-card-stack">
        {featureCards.map(({ title, description, icon: Icon }) => (
          <article key={title} className="landing-editorial-card">
            <div className="landing-editorial-card__icon">
              <Icon size={18} />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
