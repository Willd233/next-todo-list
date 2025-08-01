"use server";

import { cookies } from "next/headers";

type TSetCookie = {
  name: string;
  value: "en" | "es";
};

type TGetCookie = {
  name: string;
  defaultValue: "en" | "es";
};

export async function getUserLocale(props: TGetCookie): Promise<"en" | "es"> {
  const { name, defaultValue } = props;
  return ((await cookies()).get(name)?.value as "en" | "es") || defaultValue;
}

export async function setUserLocale(props: TSetCookie): Promise<void> {
  const { name, value } = props;
  (await cookies()).set(name, value);
}
