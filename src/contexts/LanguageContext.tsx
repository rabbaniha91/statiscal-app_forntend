import { createContext, useContext, useEffect, useState } from "react";

type Language = "fa" | "en" | "system";

type LanguageProviderProps = {
  children: React.ReactNode;
  defaultLanguage?: Language;
  storageKey?: string;
};

type LanguageProviderState = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const initialState: LanguageProviderState = {
  language: "system",
  setLanguage: () => null,
};

const LanguageProviderContext = createContext<LanguageProviderState>(initialState);

export function LanguageProvider({ children, defaultLanguage = "system", storageKey = "lang", ...props }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem(storageKey) as Language) || defaultLanguage);

  useEffect(() => {
    const root = window.document.documentElement;

    if (language === "system") {
      setLanguage(navigator.languages[1] === "fa" ? "fa" : "en");
    }

    root.dir = language === "fa" ? "rtl" : "ltr";
  }, [language]);

  const value = {
    language,
    setLanguage: (language: Language) => {
      localStorage.setItem(storageKey, language);
      setLanguage(language);
    },
  };

  return (
    <LanguageProviderContext.Provider
      {...props}
      value={value}
    >
      {children}
    </LanguageProviderContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext);

  if (context === undefined) throw new Error("useLanguage must be used within a LanguageProvider");

  return context;
};
