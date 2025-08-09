"use client";

// Dependencies.
import { useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { faGear } from "@fortawesome/free-solid-svg-icons";

// Store.
import { store } from "./store";

// Helpers.
import { api } from "@/global/helpers/api";

// Components.
import { Button } from "@/global/components/forms";
import { AddTodo, Todos, Completed, Time } from "./components";
import { Skeleton } from "@/global/components/skeleton/Skeleton";

// Url.
import { todoUrl } from "@/global/constants";

// Styles.
import styles from "./styles/Dashboard.module.scss";

export function Dashboard() {
  const t = useTranslations("Page.Dashboard");

  const { status, setStatus, setTodos, setSelectedTodoId } = store();

  const router = useRouter();

  // Get Todos
  const getTodos = useCallback(async () => {
    setStatus("loading");
    try {
      const data = await api(todoUrl);

      setTodos(data);
      setStatus("success");
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
      await api(`${todoUrl}${id}`, {
        method: "DELETE",
      });

      setStatus("success");
      toast.success(t("delete"));
      getTodos();
      setSelectedTodoId(null);
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
          icon={faGear}
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
