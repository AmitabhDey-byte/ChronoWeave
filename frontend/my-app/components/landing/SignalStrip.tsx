import { signalCards } from "./landing-data";

export function SignalStrip() {
  return (
    <section className="landing-signal-strip">
      {signalCards.map(({ title, subtitle, icon: Icon }) => (
        <article key={title} className="landing-signal-card">
          <div className="landing-signal-card__icon">
            <Icon size={18} />
          </div>
          <div>
            <strong>{title}</strong>
            <p>{subtitle}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
