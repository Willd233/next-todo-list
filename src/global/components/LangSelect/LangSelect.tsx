// Dependencies.
import { useState } from "react";
import { useLocale } from "next-intl";

// Locales.
import { setUserLocale } from "@/i18n/locales";

// Types.
import { TLocale } from "@/global/types";

// Constants.
import { languages } from "@/global/constants";

// Styles.
import styles from "./styles/LangSelect.module.scss";

export function LangSelector() {
  const getLocale = useLocale();

  const [locale, setLocale] = useState(getLocale);

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLocale = event.target.value as TLocale;
    setUserLocale({ name: "locale", value: newLocale });
    setLocale(newLocale);
  };

  return (
    <div className={styles.languageSelector}>
      <select
        id="language-select"
        value={locale}
        onChange={handleLanguageChange}
      >
        <option value="es">{languages[locale as TLocale].spanish}</option>
        <option value="en">{languages[locale as TLocale].english}</option>
      </select>
    </div>
  );
}
