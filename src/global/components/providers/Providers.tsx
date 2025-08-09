// Dependencies.
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Bounce, ToastContainer } from "react-toastify";

// Styles.
import "react-toastify/dist/ReactToastify.css";

export async function Providers({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <NextAuthSessionProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
          className="toast-container"
        />
        {children}
      </NextIntlClientProvider>
    </NextAuthSessionProvider>
  );
}
