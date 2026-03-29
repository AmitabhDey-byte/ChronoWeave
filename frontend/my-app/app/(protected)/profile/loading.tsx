export default function Loading() {
  return (
    <div className="loading-scene">
      <div className="loading-stack">
        <div className="loading-card loading-card--hero" />
        <div className="loading-row">
          <div className="loading-card" />
          <div className="loading-card" />
          <div className="loading-card" />
          <div className="loading-card" />
        </div>
        <div className="loading-row loading-row--wide">
          <div className="loading-card loading-card--tall" />
          <div className="loading-card loading-card--tall" />
        </div>
      </div>
    </div>
  );
}
