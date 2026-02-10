import { useLanguage } from '../context/LanguageContext';

interface Props {
  onClose: () => void;
}

export default function SecretMessage({ onClose }: Props) {
  const { t } = useLanguage();

  return (
    <div className="secret-overlay" onClick={onClose}>
      <div className="secret-card" onClick={e => e.stopPropagation()}>
        <div className="secret-icon" aria-hidden="true">
          <svg viewBox="0 0 60 56" width="56" height="52">
            <path
              d="M30 54C30 54 2 36 2 18C2 8 10 2 18 2C23 2 27 5 30 9C33 5 37 2 42 2C50 2 58 8 58 18C58 36 30 54 30 54Z"
              fill="var(--accent)"
            />
          </svg>
        </div>
        <h2 className="secret-title">{t('secretTitle')}</h2>
        <p className="secret-text">{t('secretText')}</p>
        <button className="secret-close" onClick={onClose}>{t('close')}</button>
      </div>
    </div>
  );
}
