"use client";
import { useForm } from "react-hook-form";
import { Button, Form, Input } from "@/components/forms";
import styles from "./styles/SignIn.module.scss";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { store } from "./store";
import { useRouter } from "next/navigation";

type TSignInForm = {
  email: string;
  password: string;
};

export function SignIn() {
  const { status, setStatus } = store();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInForm>();

  const onSubmit = async (data: TSignInForm) => {
    setStatus("Loading");
    const result = await signIn("credentials", {
      email: data.email.toLowerCase().trim(),
      password: data.password,
      redirect: false,
    });

    if (result.error) {
      setStatus("Error");
      toast.error(result.error);
    } else {
      setStatus("Success");
      toast.success("Signed in successfully");
      router.push("/dashboard");
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div>
          <h1 className={styles.title}>Sign In</h1>
          <p className={styles.description}>
            ¿Listo para otro día productivo? Inicia sesión
          </p>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
            })}
          />

          <Button
            disabled={status === "Loading"}
            type="submit"
            variant="main"
            className={styles.button}
          >
            SignIn
          </Button>
          <div className={styles.linkContainer}>
            <p>No tienes una cuenta?</p>
            <p
              className={styles.link}
              onClick={() => router.push("/auth/signup")}
            >
              Sign Up
            </p>
          </div>
        </Form>
      </div>
    </section>
  );
}
