"use client";
import { useTranslations } from "next-intl";
import styles from "./styles/Dashboard.module.scss";

import { Button } from "@/components/forms";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { store } from "./store";
import { TTodo } from "./types";
import { AddTodo, Todos, Completed, Time } from "./components";

export function Dashboard() {
  const t = useTranslations("Page.Dashboard");

  const { status, setStatus, setTodos } = store();

  const router = useRouter();

  const getTodos = useCallback(async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: TTodo[] = await res.json();

      if (res.ok) {
        setTodos(data);
        setStatus("success");
      }
    } catch (error: any) {
      console.log(error.message);
      setStatus("error");
      return [];
    }
  }, [setTodos, setStatus]);

  useEffect(() => {
    if (status === "idle") {
      getTodos();
    }
  }, [getTodos, status]);

  return (
    <div className={styles.container}>
      <Button
        icon={faUser}
        onClick={() => {
          router.push("/dashboard/profile");
        }}
      >
        Profile
      </Button>
      <Time />
      <section className={styles.stats}>
        <div className={styles.todo}>
          <h1>{t("todo")}</h1>
          <AddTodo getTodos={getTodos} />
          <Todos getTodos={getTodos} />
        </div>
        <div className={styles.completedContainer}>
          <h3 className={styles.titleCompleted}>{t("completed")}</h3>
          <Completed getTodos={getTodos} />
        </div>
      </section>
    </div>
  );
}
