import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
}

export default function InstallPrompt() {
  const { t } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!deferredPrompt || dismissed) return null;

  return (
    <div className="install-prompt">
      <span className="install-text">{t('installHint')}</span>
      <button
        className="install-btn"
        onClick={async () => {
          await deferredPrompt.prompt();
          setDeferredPrompt(null);
        }}
      >
        {t('install')}
      </button>
      <button className="install-dismiss" onClick={() => setDismissed(true)} aria-label={t('dismissInstall')}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
