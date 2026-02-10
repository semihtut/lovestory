import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { ui, type Lang } from '../i18n/uiStrings';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue>(null!);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('lovestory-lang');
    return (saved === 'ru' ? 'ru' : 'en') as Lang;
  });

  useEffect(() => {
    document.documentElement.lang = lang === 'ru' ? 'ru' : 'en';
  }, [lang]);

  const changeLang = useCallback((l: Lang) => {
    setLang(l);
    localStorage.setItem('lovestory-lang', l);
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      let str = ui[key]?.[lang] ?? key;
      if (vars) {
        Object.entries(vars).forEach(([k, v]) => {
          str = str.replace(`{${k}}`, String(v));
        });
      }
      return str;
    },
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
