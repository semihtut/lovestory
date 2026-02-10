import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  onClose: () => void;
}

interface Particle {
  id: number;
  left: string;
  delay: string;
  duration: string;
  color: string;
  size: number;
  drift: number;
}

const COLORS = ['#a855f7', '#7c3aed', '#c084fc', '#ec4899', '#d946ef', '#8b5cf6'];

export default function JourneyComplete({ onClose }: Props) {
  const { t } = useLanguage();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 2}s`,
        duration: `${2.5 + Math.random() * 2}s`,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 6 + Math.random() * 8,
        drift: -30 + Math.random() * 60,
      })),
    );
  }, []);

  return (
    <div className="complete-overlay">
      {/* Confetti */}
      <div className="confetti-container" aria-hidden="true">
        {particles.map(p => (
          <span
            key={p.id}
            className="confetti-piece"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              backgroundColor: p.color,
              width: p.size,
              height: p.size * 0.6,
              '--drift': `${p.drift}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="complete-card">
        <div className="complete-heart" aria-hidden="true">
          <svg viewBox="0 0 60 56" width="72" height="68">
            <path
              d="M30 54C30 54 2 36 2 18C2 8 10 2 18 2C23 2 27 5 30 9C33 5 37 2 42 2C50 2 58 8 58 18C58 36 30 54 30 54Z"
              fill="var(--accent)"
            />
          </svg>
        </div>
        <h1 className="complete-title">{t('completeTitle')}</h1>
        <p className="complete-message">{t('completeMessage')}</p>
        <button className="complete-btn" onClick={onClose}>
          {t('close')}
        </button>
      </div>
    </div>
  );
}
