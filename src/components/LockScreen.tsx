import { useState, useEffect, useMemo, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getTimeRemaining, type TimeRemaining } from '../utils/unlock';
import { teaserMessages } from '../i18n/uiStrings';
import { journeySteps } from '../data/journeyData';

interface LockScreenProps {
  onUnlocked: () => void;
}

const TEASER_KEY = 'lovestory-teaser-idx';
const STEP_COUNT = journeySteps.length;

function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches
    || ('standalone' in navigator && (navigator as unknown as { standalone: boolean }).standalone);
}

/** Pick a teaser index based on days left + cycling via localStorage */
function pickTeaserIndex(daysLeft: number): number {
  const total = teaserMessages.length;
  // Combine days-based offset with a stored cycling index
  const stored = parseInt(localStorage.getItem(TEASER_KEY) || '0', 10);
  const next = (stored + 1) % total;
  localStorage.setItem(TEASER_KEY, String(next));
  // Mix in daysLeft so messages feel contextual closer to Feb 14
  return (next + daysLeft) % total;
}

/** Generate an .ics file and trigger download */
function downloadICS(lang: 'en' | 'ru') {
  const title = lang === 'ru'
    ? 'Наша история откроется 💜'
    : 'Our Love Story unlocks 💜';
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//LoveStory//EN',
    'BEGIN:VEVENT',
    'DTSTART;TZID=Europe/Moscow:20260214T000000',
    'DTEND;TZID=Europe/Moscow:20260214T235900',
    `SUMMARY:${title}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'love-story.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function LockScreen({ onUnlocked }: LockScreenProps) {
  const { lang, t } = useLanguage();
  const [time, setTime] = useState<TimeRemaining>(() => getTimeRemaining());
  const [revealed, setRevealed] = useState(false);
  const [homeDismissed, setHomeDismissed] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  const isIos = useMemo(() => /iP(hone|ad|od)/.test(navigator.userAgent), []);
  const showHomeHint = !isStandalone() && !homeDismissed;

  // Pick teaser on mount (once per app open)
  const teaserIdx = useMemo(() => pickTeaserIndex(time.days), []);
  const teaser = teaserMessages[teaserIdx];

  // Which dot to highlight (cycles through steps based on days left)
  const highlightedDot = time.days % STEP_COUNT;

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

  const handleSaveDate = useCallback(() => {
    downloadICS(lang);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2000);
  }, [lang]);

  const pad = (n: number) => String(n).padStart(2, '0');

  const shareIcon = (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ display: 'inline-block', verticalAlign: '-3px' }}>
      <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );

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

            {/* Rotating teaser message */}
            <p className="lock-teaser">{teaser[lang]}</p>

            <p className="lock-note">{t('lockNote')}</p>

            {/* Preview strip — abstract dots for each step */}
            <div className="lock-preview-strip">
              {Array.from({ length: STEP_COUNT }, (_, i) => (
                <span
                  key={i}
                  className={`lock-preview-dot${i === highlightedDot ? ' lock-preview-active' : ''}`}
                />
              ))}
            </div>

            {/* Save the date button */}
            <button className="save-date-btn" onClick={handleSaveDate}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ marginRight: 6 }}>
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              {t('saveTheDate')}
            </button>
          </>
        )}
      </div>

      {showHomeHint && (
        <div className="home-hint">
          <p className="home-hint-title">{t('addHomeHint')}</p>
          <p className="home-hint-step">
            {isIos
              ? <>{t('addHomeIos').split('{icon}')[0]}{shareIcon}{t('addHomeIos').split('{icon}')[1]}</>
              : t('addHomeAndroid')
            }
          </p>
          <button className="home-hint-dismiss" onClick={() => setHomeDismissed(true)} aria-label="Dismiss">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Saved toast */}
      {showSavedToast && (
        <div className="heart-toast">{t('saved')}</div>
      )}
    </div>
  );
}
