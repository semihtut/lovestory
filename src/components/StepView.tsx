import { useState, useCallback, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import HeartAnimation from './HeartAnimation';
import type { JourneyStep } from '../data/journeyData';
import { journeySteps } from '../data/journeyData';

interface StepViewProps {
  step: JourneyStep;
  isCompleted: boolean;
  onComplete: (stepId: string) => void;
  onBack: () => void;
}

type QuizPhase = 'answering' | 'correct-delay' | 'success';

export default function StepView({ step, isCompleted, onComplete, onBack }: StepViewProps) {
  const { lang, t } = useLanguage();
  const [heroIdx, setHeroIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [phase, setPhase] = useState<QuizPhase>('answering');
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const touchRef = useRef<{ x: number; y: number } | null>(null);

  // Reset state when step changes
  useEffect(() => {
    setHeroIdx(0);
    setSelected(null);
    setAnswered(false);
    setPhase('answering');
  }, [step.id]);

  const handleAnswer = useCallback(
    (index: number) => {
      if (answered) return;
      setSelected(index);
      setAnswered(true);
      if (step.quiz.options[index].isCorrect) {
        setPhase('correct-delay');
        setTimeout(() => setPhase('success'), 800);
      }
    },
    [answered, step.quiz.options],
  );

  const handleTryAgain = () => {
    setSelected(null);
    setAnswered(false);
    setPhase('answering');
  };

  const handleImgError = (photo: string) => {
    setFailedImages(prev => new Set(prev).add(photo));
  };

  // Hero swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchRef.current) return;
    const dx = e.changedTouches[0].clientX - touchRef.current.x;
    const dy = e.changedTouches[0].clientY - touchRef.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0 && heroIdx < step.photos.length - 1) setHeroIdx(heroIdx + 1);
      if (dx > 0 && heroIdx > 0) setHeroIdx(heroIdx - 1);
    }
    touchRef.current = null;
  };

  const base = import.meta.env.BASE_URL;
  const total = journeySteps.length;
  const heroPhoto = step.photos[heroIdx];
  const heroFailed = failedImages.has(heroPhoto);
  const isCorrectAnswer = answered && selected !== null && step.quiz.options[selected].isCorrect;

  return (
    <div className="step-view">
      {phase === 'success' && <HeartAnimation />}

      <div className="step-scroll">
        <div className="step-counter">{t('stepOf', { n: step.order, total })}</div>

        {/* Hero photo with swipe */}
        <div
          className={`photo-hero${heroFailed ? ' placeholder' : ''}`}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {!heroFailed && (
            <img
              key={heroPhoto}
              src={`${base}photos/${heroPhoto}`}
              alt={step.city[lang]}
              width={400}
              height={300}
              onError={() => handleImgError(heroPhoto)}
            />
          )}
          {/* Dot indicators */}
          {step.photos.length > 1 && (
            <div className="hero-dots">
              {step.photos.map((_, i) => (
                <span key={i} className={`hero-dot${i === heroIdx ? ' active' : ''}`} />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {step.photos.length > 1 && (
          <div className="photo-thumbs">
            {step.photos.map((photo, i) => {
              const failed = failedImages.has(photo);
              return (
                <button
                  key={i}
                  className={`thumb${i === heroIdx ? ' thumb-active' : ''}${failed ? ' placeholder' : ''}`}
                  onClick={() => setHeroIdx(i)}
                  aria-label={`Photo ${i + 1}`}
                >
                  {!failed && (
                    <img src={`${base}photos/${photo}`} alt="" width={56} height={56} onError={() => handleImgError(photo)} />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* City heading */}
        <div className="step-city">
          <h2 className="city-title">{step.city[lang]}</h2>
          <span className="country-name">{step.country[lang]}</span>
        </div>

        {/* Romantic card */}
        <div className="romantic-card">
          <p>{step.cardText[lang]}</p>
        </div>

        {/* Quiz / states */}
        {isCompleted ? (
          <div className="stamped-section">
            <div className="stamped-badge">{t('stamped')}</div>
          </div>
        ) : phase === 'success' ? (
          <div className="success-section">
            <div className="stamped-badge stamp-animate">{t('stamped')}</div>
            <p className="correct-msg">{t('correct')}</p>
            <button className="continue-btn" onClick={() => onComplete(step.id)}>
              {t('continue')}
            </button>
          </div>
        ) : (
          <div className="quiz-card">
            <div className="quiz-label">{t('quiz')}</div>
            <p className="quiz-question">{step.quiz.question[lang]}</p>
            <div className="quiz-options">
              {step.quiz.options.map((opt, i) => {
                let cls = 'quiz-option';
                if (answered && i === selected) {
                  cls += opt.isCorrect ? ' correct' : ' wrong';
                }
                return (
                  <button
                    key={i}
                    className={cls}
                    onClick={() => handleAnswer(i)}
                    disabled={answered}
                  >
                    {opt.text[lang]}
                  </button>
                );
              })}
            </div>
            {answered && !isCorrectAnswer && (
              <div className="try-again-section">
                <p className="try-again-msg">{t('tryAgain')}</p>
                <button className="try-again-btn" onClick={handleTryAgain} aria-label="Try again">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M1 4v6h6" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <button className="back-to-map-btn" onClick={onBack}>{t('backToMap')}</button>
    </div>
  );
}
