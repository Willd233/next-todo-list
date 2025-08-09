"use client";
// Dependencies.
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

// Components.
import { Button, Form, Input } from "@/global/components/forms";

// Types.
import { TSignInForm } from "./types";
import { TStatus } from "@/global/types";

// Styles
import styles from "./styles/SignIn.module.scss";

export function SignIn() {
  const [status, setStatus] = useState<TStatus>("idle");
  const t = useTranslations("Page.Auth.SignIn");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInForm>();

  const onSubmit = async (data: TSignInForm) => {
    setStatus("loading");
    const result = await signIn("credentials", {
      email: data.email.toLowerCase().trim(),
      password: data.password,
      redirect: false,
    });

    if (result.error) {
      setStatus("error");
      toast.error(t("error"));
    } else {
      setStatus("success");
      toast.success(t("success"));
      router.push("/dashboard");
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div>
          <h1 className={styles.title}>{t("signIn")}</h1>
          <p className={styles.description}>{t("description")}</p>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            icon={faEnvelope}
            label={t("email")}
            type="email"
            placeholder={t("emailPlaceholder")}
            errors={errors.email?.message || ""}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address.",
              },
            })}
          />

          <Input
            icon={faKey}
            label={t("password")}
            type="password"
            placeholder={t("passwordPlaceholder")}
            errors={errors.password?.message || ""}
            {...register("password", {
              required: true,
            })}
          />

          <Button
            disabled={status === "loading"}
            type="submit"
            size="small"
            className={styles.button}
          >
            {t("signIn")}
          </Button>
          <div className={styles.linkContainer}>
            <p>{t("noAccount")}</p>
            <p
              className={styles.link}
              onClick={() => router.push("/auth/signup")}
            >
              {t("signUp")}
            </p>
          </div>
        </Form>
      </div>
    </section>
  );
}
