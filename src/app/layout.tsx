// Dependencies.
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Poppins } from "next/font/google";

// Providers.
import { Providers } from "@/global/components/providers/Providers";

// Styles.
import "@/global/styles/globals.scss";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "ToDo List",
  description: "Creation of a todo list",
};

const locale = await getLocale();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={locale}>
      <body className={`${poppins.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
