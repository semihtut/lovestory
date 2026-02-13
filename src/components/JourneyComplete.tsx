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

/* Heart path constants (same as IntroAnimation) */
const SAR = { x: 250, y: 355 };
const P1 = `M250,130 C 90,45 15,235 ${SAR.x},${SAR.y}`;
const P2 = `M250,130 C 410,45 485,235 ${SAR.x},${SAR.y}`;

export default function JourneyComplete({ onClose }: Props) {
  const { t } = useLanguage();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showCoupon, setShowCoupon] = useState(false);
  const [heartKey, setHeartKey] = useState(0);

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
    const timer = setTimeout(() => setShowCoupon(true), 2500);
    return () => clearTimeout(timer);
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
        {/* Mini heart animation (replays on button click) */}
        <div className="complete-heart-anim" aria-hidden="true">
          <svg key={heartKey} viewBox="0 0 500 400" width="200" height="160">
            <path d={P1} fill="none" stroke="#a855f7" strokeWidth="3"
              strokeLinecap="round" opacity="0.85" pathLength={1}
              strokeDasharray="1" strokeDashoffset="1">
              <animate attributeName="stroke-dashoffset" from="1" to="0" dur="2s" begin="0.3s" fill="freeze" />
            </path>
            <path d={P2} fill="none" stroke="#ec4899" strokeWidth="3"
              strokeLinecap="round" opacity="0.85" pathLength={1}
              strokeDasharray="1" strokeDashoffset="1">
              <animate attributeName="stroke-dashoffset" from="1" to="0" dur="2s" begin="0.3s" fill="freeze" />
            </path>
            {/* Meeting heart at bottom */}
            <g transform={`translate(${SAR.x},${SAR.y - 10})`}>
              <path
                d="M0 14C0 14 -16 2 -16 -4C-16 -10 -12 -14 -8 -14C-4 -14 0 -11 0 -7C0 -11 4 -14 8 -14C12 -14 16 -10 16 -4C16 2 0 14 0 14Z"
                fill="#a855f7" opacity="0" transform="scale(0)">
                <animate attributeName="opacity" from="0" to="1" dur="0.2s" begin="2.5s" fill="freeze" />
                <animateTransform
                  attributeName="transform" type="scale"
                  values="0; 1.5; 0.9; 1.1; 1"
                  keyTimes="0; 0.35; 0.65; 0.85; 1"
                  dur="0.8s" begin="2.5s" fill="freeze"
                />
              </path>
            </g>
          </svg>
          <button className="replay-heart-btn" onClick={() => setHeartKey(k => k + 1)} title={t('replayHearts')}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M1 4v6h6" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
          </button>
        </div>

        <h1 className="complete-title">{t('completeTitle')}</h1>
        <p className="complete-message">{t('completeMessage')}</p>

        <h3 className="reasons-title">{t('reasonsTitle')}</h3>
        <ul className="reasons-list">
          {[1,2,3,4,5,6,7,8].map(n => (
            <li key={n} className="reason-item" style={{ animationDelay: `${0.3 + n * 0.15}s` }}>
              {t(`reason${n}`)}
            </li>
          ))}
        </ul>

        {/* Surprise Coupon */}
        {showCoupon && (
          <div className="surprise-coupon">
            <div className="coupon-sparkle" aria-hidden="true">✨</div>
            <div className="coupon-label">{t('surpriseCoupon')}</div>
            <h3 className="coupon-title">{t('couponTitle')}</h3>
            <p className="coupon-text">{t('couponText')}</p>
            <div className="coupon-code-wrap">
              <span className="coupon-code">{t('couponCode')}</span>
            </div>
            <p className="coupon-valid">{t('couponValid')}</p>
          </div>
        )}

        <button className="complete-btn" onClick={onClose}>
          {t('close')}
        </button>
      </div>
    </div>
  );
}
