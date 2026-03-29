export const ProgressStepper = ({ current, total }: { current: number; total: number }) => (
  <div className="progress-stepper">
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} className={`progress-stepper__segment${i < current ? " progress-stepper__segment--active" : ""}`} />
    ))}
  </div>
);
