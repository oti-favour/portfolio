const PHRASES = [
  "Selected work",
  "Built with care",
  "React · Next · Flutter",
  "Available for work",
  "Travel · Hospitality · EV",
];

export function Marquee() {
  const group = (
    <div className="flex shrink-0">
      {PHRASES.map((phrase) => (
        <span key={phrase} className="marquee-item">
          {phrase}
          <span className="marquee-star">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {group}
        {group}
      </div>
    </div>
  );
}
