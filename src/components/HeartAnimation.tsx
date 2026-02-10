import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: number;
  drift: number;
}

export default function HeartAnimation() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setHearts(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${5 + Math.random() * 90}%`,
        delay: `${Math.random() * 1.2}s`,
        duration: `${2.2 + Math.random() * 1.8}s`,
        size: 18 + Math.random() * 14,
        drift: -40 + Math.random() * 80,
      })),
    );
    const timer = setTimeout(() => setVisible(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="hearts-container" aria-hidden="true">
      {hearts.map(h => (
        <svg
          key={h.id}
          className="floating-heart"
          viewBox="0 0 24 22"
          width={h.size}
          height={h.size * 0.92}
          style={{
            left: h.left,
            animationDelay: h.delay,
            animationDuration: h.duration,
            '--drift': `${h.drift}px`,
            willChange: 'transform',
          } as React.CSSProperties}
        >
          <path
            d="M12 21C12 21 1 13.5 1 7C1 3.1 4 0.5 7.5 0.5C9.5 0.5 11.2 1.8 12 3.5C12.8 1.8 14.5 0.5 16.5 0.5C20 0.5 23 3.1 23 7C23 13.5 12 21 12 21Z"
            fill="var(--accent)"
            opacity="0.85"
          />
        </svg>
      ))}
    </div>
  );
}
