import { createContext, useContext, useEffect, useState } from "react";

export type Language = "en-US" | "zh-CN";

type LanguageProviderProps = {
  children: React.ReactNode;
  defaultLanguage?: Language;
  storageKey?: string;
};

type LanguageProviderState = {
  locale: Language;
  setLocale: (lang: Language) => void;
};

const initialState: LanguageProviderState = {
  locale: "en-US",
  setLocale: () => null,
};

const LanguageProviderContext =
  createContext<LanguageProviderState>(initialState);

const LANGUAGE_VALUES: Language[] = ["en-US", "zh-CN"];

const isBrowser = () => typeof window !== "undefined";

const getStoredLanguage = (
  storageKey: string,
  fallback: Language,
): Language => {
  if (!isBrowser()) {
    return fallback;
  }

  try {
    const storedLanguage = window.localStorage.getItem(storageKey);
    if (storedLanguage && LANGUAGE_VALUES.includes(storedLanguage as Language)) {
      return storedLanguage as Language;
    }
  } catch {
    // Ignore storage access failures (private mode, disabled storage, SSR).
  }

  return fallback;
};

export function LanguageProvider({
  children,
  defaultLanguage = "en-US",
  storageKey = "user-language",
}: LanguageProviderProps) {
  const [locale, setLocale] = useState<Language>(defaultLanguage);

  useEffect(() => {
    setLocale(getStoredLanguage(storageKey, defaultLanguage));
  }, [defaultLanguage, storageKey]);

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    const root = window.document.documentElement;
    root.setAttribute("lang", locale);

    try {
      window.localStorage.setItem(storageKey, locale);
    } catch {
      // Ignore storage write failures.
    }
  }, [locale, storageKey]);

  return (
    <LanguageProviderContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageProviderContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext);

  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};
