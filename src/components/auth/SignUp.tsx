"use client";
import { useForm } from "react-hook-form";
import { store } from "./store";
import { useRouter } from "next/navigation";

import { Button, Form, Input } from "@/components/forms";
import { toast } from "react-toastify";
import styles from "./styles/SignUp.module.scss";
import { faEnvelope, faKey, faUser } from "@fortawesome/free-solid-svg-icons";

type TSignUpForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignUp() {
  const { status, setStatus } = store();

  const router = useRouter();

  const url = "/api/auth/register";

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
      name: data.name.trim(),
      email: data.email.trim(),
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
    <div className={styles.container}>
      <h1>SignUp</h1>
      <Form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
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
          variant="main"
          disabled={status === "Loading"}
          className={styles.button}
        >
          SignUp
        </Button>
      </Form>
    </div>
  );
}
