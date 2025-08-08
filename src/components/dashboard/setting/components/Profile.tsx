// Dependencies.
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { faEnvelope, faKey, faUser } from "@fortawesome/free-solid-svg-icons";

// Components.
import { Button, Form, Input } from "@/components/forms";

// Types.
import { TStatus } from "@/global/types";
import { TUpdateUserForm } from "../types";

// Styles.
import styles from "./styles/Profile.module.scss";

// Url.
const url = "/api/user";

export function Profile() {
  const [status, setStatus] = useState<TStatus>("idle");
  const { data: session, status: sessionStatus } = useSession();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: session?.user?.name,
      firstName: session?.user?.firstName,
      lastName: session?.user?.lastName,
      email: session?.user?.email,
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (sessionStatus === "authenticated" && session?.user) {
      reset({
        name: session.user.name,
        firstName: session.user.firstName,
        lastName: session.user.lastName,
        email: session.user.email,
        password: "",
        confirmPassword: "",
      });
    }
  }, [session, sessionStatus, reset]);

  const password = watch("password");

  const onSubmit = async (data: TUpdateUserForm) => {
    setStatus("loading");

    const newData = {
      name: data.name.toLowerCase().trim(),
      firstName: data.firstName.toLowerCase().trim(),
      lastName: data.lastName.toLowerCase().trim(),
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
        toast.success("User updated successfully");
      }
    } catch (error: any) {
      setStatus("error");
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Profile</h2>
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
          id="firstName"
          icon={faUser}
          label="First Name"
          type="text"
          placeholder="Please enter your first name"
          errors={errors.firstName?.message || ""}
          {...register("firstName")}
        />

        <Input
          id="lastName"
          icon={faUser}
          label="Last Name"
          type="text"
          placeholder="Please enter your last name"
          errors={errors.lastName?.message || ""}
          {...register("lastName")}
        />

        <Input
          id="email"
          icon={faEnvelope}
          label="Email"
          type="email"
          placeholder="Please enter your email."
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
          label="Password"
          type="text"
          placeholder="Please enter your password"
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
          label="Confirm Password"
          type="text"
          placeholder="Please enter your password"
          errors={errors.confirmPassword?.message || ""}
          {...register("confirmPassword", {
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
          disabled={status === "loading"}
          className={styles.button}
        >
          save
        </Button>
      </Form>
    </div>
  );
}
