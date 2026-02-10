import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getTimeRemaining, type TimeRemaining } from '../utils/unlock';

interface LockScreenProps {
  onUnlocked: () => void;
}

export default function LockScreen({ onUnlocked }: LockScreenProps) {
  const { t } = useLanguage();
  const [time, setTime] = useState<TimeRemaining>(() => getTimeRemaining());
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      const remaining = getTimeRemaining();
      setTime(remaining);
      if (remaining.total <= 0) {
        clearInterval(id);
        onUnlocked();
      }
    }, 1000);
    return () => clearInterval(id);
  }, [onUnlocked]);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="lock-screen">
      <div className="lock-content">
        <button
          className={`lock-heart-btn${revealed ? ' revealed' : ''}`}
          onClick={() => setRevealed(true)}
          aria-label={t('tapHeart')}
        >
          <svg viewBox="0 0 60 56" width="72" height="68">
            <path
              d="M30 54C30 54 2 36 2 18C2 8 10 2 18 2C23 2 27 5 30 9C33 5 37 2 42 2C50 2 58 8 58 18C58 36 30 54 30 54Z"
              fill="var(--accent)"
            />
          </svg>
        </button>

        <h1 className="lock-title">{t('lockTitle')}</h1>
        <p className="lock-subtitle">{t('lockSubtitle')}</p>

        {!revealed ? (
          <p className="lock-tap-hint">{t('tapHeart')}</p>
        ) : (
          <>
            <div className="countdown countdown-bounce">
              <div className="countdown-unit">
                <span className="countdown-number">{pad(time.days)}</span>
                <span className="countdown-label">{t('days')}</span>
              </div>
              <span className="countdown-sep">:</span>
              <div className="countdown-unit">
                <span className="countdown-number">{pad(time.hours)}</span>
                <span className="countdown-label">{t('hours')}</span>
              </div>
              <span className="countdown-sep">:</span>
              <div className="countdown-unit">
                <span className="countdown-number">{pad(time.minutes)}</span>
                <span className="countdown-label">{t('minutes')}</span>
              </div>
              <span className="countdown-sep">:</span>
              <div className="countdown-unit">
                <span className="countdown-number">{pad(time.seconds)}</span>
                <span className="countdown-label">{t('seconds')}</span>
              </div>
            </div>

            <p className="lock-note">{t('lockNote')}</p>
          </>
        )}
      </div>
    </div>
  );
}
