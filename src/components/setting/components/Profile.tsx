// Dependencies.
import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { faEnvelope, faKey, faUser } from "@fortawesome/free-solid-svg-icons";

// Components.
import { Button, Form, Input } from "@/global/components/forms";

// Types.
import { TStatus } from "@/global/types";
import { TUpdateUserForm } from "../types";

// Styles.
import styles from "./styles/Profile.module.scss";

// Url.
const url = "/api/user";

export function Profile() {
  const [status, setStatus] = useState<TStatus>("idle");
  const [user, setUser] = useState<TUpdateUserForm | null>(null);

  const t = useTranslations("Page.Profile");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const getUser = useCallback(async () => {
    setStatus("loading");

    try {
      const res = await fetch(url);

      if (!res.ok) {
        const dataError = await res.json();
        toast.error(dataError.message);
      } else {
        const data = await res.json();
        setUser(data);
        reset(data);
        setStatus("success");
      }
    } catch (error: any) {
      setStatus("error");
      toast.error(error.message);
    }
  }, [reset]);

  const onSubmit = async (data: TUpdateUserForm) => {
    setStatus("loading");

    const newData = {
      name: data.name.trim(),
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.toLowerCase().trim(),
      password: data.password.trim(),
    };

    try {
      const res = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const dataError = await res.json();
        setStatus("error");
        toast.error(dataError.message);
      } else {
        setStatus("success");
        toast.success(t("success"));
      }
    } catch (error: any) {
      setStatus("error");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <div className={styles.container}>
      <h2>{t("title")}</h2>
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
          id="firstName"
          icon={faUser}
          label={t("firstName")}
          type="text"
          placeholder={t("placeholderFirstName")}
          errors={errors.firstName?.message || ""}
          {...register("firstName")}
        />

        <Input
          id="lastName"
          icon={faUser}
          label={t("lastName")}
          type="text"
          placeholder={t("placeholderLastName")}
          errors={errors.lastName?.message || ""}
          {...register("lastName")}
        />

        <Input
          id="email"
          icon={faEnvelope}
          label={t("email")}
          type="email"
          placeholder={t("placeholderEmail")}
          errors={errors.email?.message || ""}
          {...register("email", {
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
            validate: (value: string) => {
              if (!password) {
                return true;
              }

              if (value !== password) {
                return "Passwords do not match.";
              }
              return true;
            },
          })}
        />

        <Button
          type="submit"
          variant="small"
          disabled={status === "loading"}
          className={styles.button}
        >
          {t("save")}
        </Button>
      </Form>
    </div>
  );
}
