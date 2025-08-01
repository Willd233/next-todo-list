import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { getUserLocale } from "@/i18n/locales";

type TLocale = "en" | "es";

const defaultValue: TLocale = "en";

export default getRequestConfig(async () => {
  const cookieStore = cookies();
  const nameCookie = "locale";

  const locale =
    ((await cookieStore).get(nameCookie)?.value as TLocale) ||
    (await getUserLocale({ name: nameCookie, defaultValue }));

  try {
    const messages = (await import(`@/lang/${locale}.json`)).default;

    return {
      locale,
      messages,
    };
  } catch (error) {
    console.error(
      `Failed to load messages for locale: ${locale}. Error:`,
      error
    );
    return {
      locale: defaultValue,
      messages: {},
    };
  }
});
