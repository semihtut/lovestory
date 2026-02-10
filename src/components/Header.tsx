import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  onReset: () => void;
  locked?: boolean;
}

export default function Header({ showBack, onBack, onReset, locked }: HeaderProps) {
  const { lang, setLang, t } = useLanguage();

  const handleReset = () => {
    if (window.confirm(t('resetConfirm'))) onReset();
  };

  return (
    <header className="app-header">
      <div className="header-left">
        {!locked && showBack && (
          <button className="header-btn" onClick={onBack} aria-label={t('back')}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}
      </div>

      <h1 className="app-title">{t('appTitle')}</h1>

      <div className="header-right">
        <button
          className="lang-toggle"
          onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}
          aria-label={t('switchLang')}
        >
          {lang === 'en' ? 'RU' : 'EN'}
        </button>
        {!locked && (
          <button className="header-btn reset-btn" onClick={handleReset} aria-label={t('resetLabel')}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M1 4v6h6" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
}
