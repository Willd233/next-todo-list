// Dependencies.
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

// Components
import { LangSelector } from "@/global/components/LangSelect/LangSelect";
import { Button } from "@/global/components/forms";

// Styles.
import styles from "./styles/Preferences.module.scss";

export function Preferences() {
  const t = useTranslations("Page.Settings.Preferences");

  return (
    <div className={styles.container}>
      <h2>{t("title")}</h2>
      <div>
        <label htmlFor="language-select" className={styles.label}>
          {t("language")}
        </label>
        <LangSelector />
      </div>
      <Button onClick={() => signOut()}>{t("logout")}</Button>
    </div>
  );
}
