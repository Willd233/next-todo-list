"use client";

// Dependencies.
import { useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { faUser } from "@fortawesome/free-solid-svg-icons";

// Store.
import { store } from "./store";

// Types.
import { TTodo } from "./types";

// Components.
import { Button } from "@/global/components/forms";
import { AddTodo, Todos, Completed, Time } from "./components";
import { Skeleton } from "@/global/components/skeleton/Skeleton";

// Styles.
import styles from "./styles/Dashboard.module.scss";

export function Dashboard() {
  const t = useTranslations("Page.Dashboard");

  const { status, setStatus, setTodos } = store();

  const router = useRouter();

  // Get Todos
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

  // Delete Todo
  const onDelete = async (id: string) => {
    setStatus("loading");

    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
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
        toast.success("Todo deleted successfully");
        getTodos();
      }
    } catch (error: any) {
      setStatus("error");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (status === "idle") {
      getTodos();
    }
  }, [getTodos, status]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button
          icon={faUser}
          onClick={() => {
            router.push("/setting");
          }}
        >
          {t("setting")}
        </Button>
      </div>
      <Time />

      <section className={styles.stats}>
        <div className={styles.todo}>
          <h1 className={styles.titleTodo}>{t("todo")}</h1>

          <AddTodo getTodos={getTodos} />

          {status === "idle" ? (
            <Skeleton />
          ) : (
            <Todos getTodos={getTodos} onDelete={onDelete} />
          )}
        </div>

        <div className={styles.completedContainer}>
          <h1 className={styles.titleCompleted}>{t("completed")}</h1>

          {status === "idle" ? (
            <Skeleton />
          ) : (
            <Completed getTodos={getTodos} onDelete={onDelete} />
          )}
        </div>
      </section>
    </div>
  );
}
