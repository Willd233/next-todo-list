"use client";
import { useForm } from "react-hook-form";
import { store } from "./store";
import { useRouter } from "next/navigation";

import { Button, Form, Input } from "@/components/forms";
import { toast } from "react-toastify";
import styles from "./styles/SignUp.module.scss";
import { faEnvelope, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { TSignUpForm } from "./types";

export function SignUp() {
  const { status, setStatus } = store();

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
    setStatus("Loading");
    const newData = {
      name: data.name.toLowerCase().trim(),
      email: data.email.toLowerCase().trim(),
      password: data.password.trim(),
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const dataError = await res.json();
        setStatus("Error");
        toast.error(dataError.message);
      } else {
        setStatus("Success");
        toast.success("Account created successfully");
        router.push("/auth/signin");
      }
    } catch (error: any) {
      setStatus("Error");
      toast.error(error.message);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>Sign Up</h1>
        <p className={styles.description}>
          Gestiona tus pendientes con facilidad. ¡Crea tu cuenta!
        </p>
        <Form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            id="name"
            icon={faUser}
            label="Name"
            type="text"
            placeholder="Please enter your name"
            errors={errors.name?.message || ""}
            {...register("name", {
              required: "Name is required",
            })}
          />
          <Input
            id="email"
            icon={faEnvelope}
            label="Email"
            type="email"
            placeholder="Please enter your email."
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
            label="Password"
            type="text"
            placeholder="Please enter your password"
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
            label="Confirm Password"
            type="text"
            placeholder="Please enter your password"
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
            variant="small"
            disabled={status === "Loading"}
            className={styles.button}
          >
            Sign Up
          </Button>
          <div className={styles.linkContainer}>
            <p>Ya tienes una cuenta?</p>
            <p
              className={styles.link}
              onClick={() => router.push("/auth/signin")}
            >
              Sign In
            </p>
          </div>
        </Form>
      </div>
    </section>
  );
}
