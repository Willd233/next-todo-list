import { TLanguageKeys, TLocale } from "../types";

export const todoUrl = "/api/todos/";

export const urlUser = "/api/user/";

export const languages: Record<TLocale, TLanguageKeys> = {
  es: {
    spanish: "Español",
    english: "Inglés",
  },
  en: {
    spanish: "Spanish",
    english: "English",
  },
};

export const defaultValue: TLocale = "en";
