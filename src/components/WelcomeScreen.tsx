import { useLanguage } from '../context/LanguageContext';

interface Props {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: Props) {
  const { t } = useLanguage();

  return (
    <div className="welcome-overlay">
      <div className="welcome-card">
        <div className="welcome-heart" aria-hidden="true">
          <svg viewBox="0 0 60 56" width="60" height="56">
            <path
              d="M30 54C30 54 2 36 2 18C2 8 10 2 18 2C23 2 27 5 30 9C33 5 37 2 42 2C50 2 58 8 58 18C58 36 30 54 30 54Z"
              fill="var(--accent)" opacity="0.9"
            />
          </svg>
        </div>
        <h1 className="welcome-title">{t('welcomeTitle')}</h1>
        <p className="welcome-message">{t('welcomeMessage')}</p>
        <button className="welcome-btn" onClick={onStart}>
          {t('welcomeStart')}
        </button>
      </div>
    </div>
  );
}
