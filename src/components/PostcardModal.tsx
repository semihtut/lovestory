import { useLanguage } from '../context/LanguageContext';
import type { JourneyStep } from '../data/journeyData';

interface Props {
  step: JourneyStep;
  onClose: () => void;
}

export default function PostcardModal({ step, onClose }: Props) {
  const { lang, t } = useLanguage();
  const photoSrc = `${import.meta.env.BASE_URL}photos/${step.photos[0]}`;

  return (
    <div className="postcard-overlay" onClick={onClose}>
      <img className="postcard-bg" src={photoSrc} alt="" />
      <div className="postcard-gradient" />

      <div className="postcard-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="postcard-city">{step.city[lang]}</h2>
        <p className="postcard-country">{step.country[lang]}</p>
        <p className="postcard-text">{step.cardText[lang]}</p>
        <p className="postcard-hint">{t('postcardHint')}</p>
      </div>

      <div className="postcard-stamp">
        <div className="postcard-stamp-city">{step.city[lang].toUpperCase()}</div>
        <div className="postcard-stamp-date">14.02.2026</div>
      </div>

      <button className="postcard-close" onClick={onClose}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6L6 18" />
          <path d="M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
