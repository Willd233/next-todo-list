"use client";

// Dependencies.
import { useTranslations } from "next-intl";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

// Components.
import { Button } from "@/global/components/forms";
import { Profile, Preferences } from "./components";

// Styles.
import styles from "./styles/Setting.module.scss";

export function Settings() {
  const t = useTranslations("Page.Settings");

  return (
    <div className={styles.container}>
      <Button
        type="button"
        icon={faArrowLeft}
        onClick={() => window.history.back()}
      >
        {t("back")}
      </Button>

      <div className={styles.content}>
        <Profile />

        <Preferences />
      </div>
    </div>
  );
}
