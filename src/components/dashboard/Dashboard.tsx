"use client";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { LangButton } from "../langButton/LangButton";

export function Dashboard() {
  const { data: session } = useSession();

  const t = useTranslations("Page.Dashboard");

  return (
    <div>
      <LangButton />
      <h1>{t("title")}</h1>
      <p>
        {t("text")} {session?.user?.name}
      </p>
    </div>
  );
}
