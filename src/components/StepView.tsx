import { useState, useCallback, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import HeartAnimation from './HeartAnimation';
import ScratchCard from './ScratchCard';
import PhotoPuzzle from './PhotoPuzzle';
import HiddenHeart from './HiddenHeart';
import HeartToast from './HeartToast';
import TicketStubCard from './TicketStubCard';
import PostcardModal from './PostcardModal';
import CityAtmosphere from './CityAtmosphere';
import type { JourneyStep } from '../data/journeyData';
import { journeySteps } from '../data/journeyData';

interface StepViewProps {
  step: JourneyStep;
  isCompleted: boolean;
  onComplete: (stepId: string) => void;
  onBack: () => void;
  collectedHearts: Set<string>;
  onCollectHeart: (stepId: string) => void;
}

type QuizPhase = 'answering' | 'correct-delay' | 'success';

export default function StepView({ step, isCompleted, onComplete, onBack, collectedHearts, onCollectHeart }: StepViewProps) {
  const { lang, t } = useLanguage();
  const [heroIdx, setHeroIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [phase, setPhase] = useState<QuizPhase>('answering');
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const touchRef = useRef<{ x: number; y: number } | null>(null);
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [showHeartToast, setShowHeartToast] = useState(false);
  const [showPostcard, setShowPostcard] = useState(false);

  // Scratch card state: check localStorage for whether already scratched
  const scratchKey = `lovestory-scratched-${step.id}`;
  const [scratched, setScratched] = useState(() => {
    return localStorage.getItem(scratchKey) === 'true';
  });

  // Reset state when step changes
  useEffect(() => {
    setHeroIdx(0);
    setSelected(null);
    setAnswered(false);
    setPhase('answering');
    setShowPuzzle(false);
    setScratched(localStorage.getItem(`lovestory-scratched-${step.id}`) === 'true');
  }, [step.id]);

  const handleScratchReveal = useCallback(() => {
    localStorage.setItem(scratchKey, 'true');
    setScratched(true);
  }, [scratchKey]);

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

  // Determine if scratch card should be shown: first photo, not completed, not yet scratched
  const showScratchCard = heroIdx === 0 && !isCompleted && !scratched;

  const heroImgElement = !heroFailed ? (
    <img
      key={heroPhoto}
      src={`${base}photos/${heroPhoto}`}
      alt={step.city[lang]}
      width={400}
      height={300}
      onError={() => handleImgError(heroPhoto)}
    />
  ) : null;

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
          {!showScratchCard && <CityAtmosphere cityId={step.id} />}
          {showScratchCard ? (
            <ScratchCard onRevealed={handleScratchReveal}>
              {heroImgElement}
            </ScratchCard>
          ) : (
            heroImgElement
          )}
          {!showScratchCard && heroIdx === 0 && (
            <HiddenHeart
              stepId={step.id}
              xPercent={step.hiddenHeart.xPercent}
              yPercent={step.hiddenHeart.yPercent}
              alreadyCollected={collectedHearts.has(step.id)}
              onCollect={(id) => {
                onCollectHeart(id);
                setShowHeartToast(true);
              }}
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

        {/* Ticket stub */}
        <TicketStubCard ticket={step.ticket} stepOrder={step.order} compact />

        {/* Quiz / states */}
        {isCompleted ? (
          <div className="stamped-section">
            <div className="stamped-badge">{t('stamped')}</div>
            <div className="stamped-actions">
              <button className="puzzle-btn" onClick={() => setShowPuzzle(true)}>
                🧩 {t('puzzleBtn')}
              </button>
              <button className="postcard-btn" onClick={() => setShowPostcard(true)}>
                ✉️ {t('postcardBtn')}
              </button>
            </div>
            {showPuzzle && (
              <PhotoPuzzle photoSrc={`${base}photos/${step.photos[0]}`} onClose={() => setShowPuzzle(false)} />
            )}
            {showPostcard && (
              <PostcardModal step={step} onClose={() => setShowPostcard(false)} />
            )}
          </div>
        ) : phase === 'success' ? (
          <div className="success-section">
            <div className="stamped-badge stamp-animate">{t('stamped')}</div>
            <p className="correct-msg">{t('correct')}</p>
            <div className="love-letter">
              <div className="love-letter-label">{t('loveLetter')}</div>
              <p className="love-letter-text">{step.loveLetter[lang]}</p>
            </div>
            <button className="postcard-btn" onClick={() => setShowPostcard(true)}>
              ✉️ {t('postcardBtn')}
            </button>
            <button className="continue-btn" onClick={() => onComplete(step.id)}>
              {t('continue')}
            </button>
            {showPostcard && (
              <PostcardModal step={step} onClose={() => setShowPostcard(false)} />
            )}
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
              <div className="hint-section">
                <div className="hint-photo-wrap">
                  <img
                    src={`${base}photos/${step.photos[Math.min(1, step.photos.length - 1)]}`}
                    alt=""
                    className="hint-photo"
                  />
                  <div className="hint-photo-overlay" />
                  <p className="hint-photo-text">{t('hintMessage')}</p>
                </div>
                <p className="try-again-msg">{t('tryAgain')}</p>
                <button className="hint-retry-btn" onClick={handleTryAgain}>
                  {t('hintTryAgain')}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <button className="back-to-map-btn" onClick={onBack}>{t('backToMap')}</button>
      {showHeartToast && (
        <HeartToast message={t('heartFound')} onDone={() => setShowHeartToast(false)} />
      )}
    </div>
  );
}
