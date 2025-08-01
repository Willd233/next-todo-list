import { setUserLocale } from "@/i18n/locales";
import { useState } from "react";
import { Button } from "../forms";

export function LangButton() {
  const [locale, setLocale] = useState<"en" | "es">("en");

  const handleButton = () => {
    const newLocale = locale === "en" ? "es" : "en";
    setUserLocale({ name: "locale", value: newLocale });
    setLocale(newLocale);
  };

  return (
    <Button onClick={handleButton}>{locale === "en" ? "Es" : "En"}</Button>
  );
}
