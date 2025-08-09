"use client";

// Dependencies.
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { faEnvelope, faKey, faUser } from "@fortawesome/free-solid-svg-icons";

// Components.
import { Button, Form, Input } from "@/global/components/forms";

// Types.
import { TSignUpForm } from "./types";
import { TStatus } from "@/global/types";

// Helpers.
import { api } from "@/global/helpers/api";

// Styles.
import styles from "./styles/SignUp.module.scss";

export function SignUp() {
  const [status, setStatus] = useState<TStatus>("idle");

  const t = useTranslations("Page.Auth.SignUp");

  const router = useRouter();

  const url = "/api/auth";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TSignUpForm>();

  const password = watch("password", "");

  const onSubmit = async (data: TSignUpForm) => {
    setStatus("loading");
    const newData = {
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      password: data.password.trim(),
    };

    try {
      await api(url, {
        method: "POST",
        body: JSON.stringify(newData),
      });

      setStatus("success");
      toast.success(t("success"));
      router.push("/auth/signin");
    } catch (error: any) {
      setStatus("error");
      toast.error(error.message);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t("signUp")}</h1>
        <p className={styles.description}>{t("description")}</p>

        <Form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            id="name"
            icon={faUser}
            label={t("name")}
            type="text"
            placeholder={t("placeholderName")}
            errors={errors.name?.message || ""}
            {...register("name", {
              required: "Name is required",
            })}
          />

          <Input
            id="email"
            icon={faEnvelope}
            label={t("email")}
            type="email"
            placeholder={t("placeholderEmail")}
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
            id="password"
            icon={faKey}
            label={t("password")}
            type="password"
            placeholder={t("placeholderPassword")}
            errors={errors.password?.message || ""}
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "At least 8 characters.",
              },
            })}
          />

          <Input
            id="confirmPassword"
            icon={faKey}
            label={t("confirmPassword")}
            type="password"
            placeholder={t("placeholderConfirmPassword")}
            errors={errors.confirmPassword?.message || ""}
            {...register("confirmPassword", {
              required: true,
              validate: (value: string) => {
                if (value !== password) {
                  return "Passwords do not match.";
                }
                return true;
              },
            })}
          />

          <Button
            type="submit"
            size="small"
            disabled={status === "loading"}
            className={styles.button}
          >
            {t("signUp")}
          </Button>

          <div className={styles.linkContainer}>
            <p>{t("alreadyAccount")}</p>

            <p
              className={styles.link}
              onClick={() => router.push("/auth/signin")}
            >
              {t("signIn")}
            </p>
          </div>
        </Form>
      </div>
    </section>
  );
}
