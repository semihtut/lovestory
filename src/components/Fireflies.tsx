import { useMemo } from 'react';

export default function Fireflies() {
  const flies = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 3,
      dur: `${6 + Math.random() * 8}s`,
      delay: `${Math.random() * 5}s`,
      opacity: 0.15 + Math.random() * 0.35,
    })), []);

  return (
    <div className="fireflies" aria-hidden="true">
      {flies.map(f => (
        <span
          key={f.id}
          className="firefly"
          style={{
            left: f.left,
            top: f.top,
            width: f.size,
            height: f.size,
            animationDuration: f.dur,
            animationDelay: f.delay,
            '--fly-opacity': f.opacity,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
