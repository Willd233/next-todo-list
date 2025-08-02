"use client";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { LangButton } from "../langButton/LangButton";
import styles from "./styles/Dashboard.module.scss";
import dayjs from "dayjs";
import "dayjs/locale/es";
import "dayjs/locale/en";

export function Dashboard() {
  const { data: session } = useSession();

  const locale = useLocale();

  if (locale === "es") {
    dayjs.locale("es");
  } else {
    dayjs.locale("en");
  }

  const time = dayjs().format("dddd, MMMM D YYYY");

  const t = useTranslations("Page.Dashboard");

  return (
    <div className={styles.container}>
      <LangButton />
      <h1>{t("title")}</h1>
      <p>
        {t("text")} {session?.user?.name} {time}
      </p>
    </div>
  );
}
