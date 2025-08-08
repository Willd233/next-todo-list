import styles from "./styles/LangSelect.module.scss";

import { useState } from "react";
import { setUserLocale } from "@/i18n/locales";
import { useLocale } from "next-intl";

type Locale = "en" | "es";

type LanguageKeys = {
  spanish: string;
  english: string;
};

const languages: Record<Locale, LanguageKeys> = {
  es: {
    spanish: "Español",
    english: "Inglés",
  },
  en: {
    spanish: "Spanish",
    english: "English",
  },
};

export function LangSelector() {
  const getLocale = useLocale();

  const [locale, setLocale] = useState(getLocale);

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLocale = event.target.value as Locale;
    setUserLocale({ name: "locale", value: newLocale });
    setLocale(newLocale);
  };

  return (
    <div className={styles.languageSelector}>
      <label htmlFor="language-select" className={styles.label}>
        Idioma:
      </label>
      <select
        id="language-select"
        value={locale}
        onChange={handleLanguageChange}
      >
        <option value="es">{languages[locale as Locale].spanish}</option>
        <option value="en">{languages[locale as Locale].english}</option>
      </select>
    </div>
  );
}
