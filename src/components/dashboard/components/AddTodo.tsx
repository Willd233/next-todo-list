// Dependencies
import { toast } from "react-toastify";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faStar } from "@fortawesome/free-solid-svg-icons";

// Store
import { store } from "../store";

// Components
import { Button, Form, Input } from "@/components/forms";
import Dialog from "@/components/dialog/Dialog";

// Types
import { AddTodoProps, TTodo } from "../types";

// Styles
import styles from "./styles/AddTodo.module.scss";

export function AddTodo(props: AddTodoProps) {
  const { getTodos } = props;

  const t = useTranslations("Page.Dashboard.AddTodo");

  const { status, setStatus, showModalAdd, setShowModalAdd } = store();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TTodo>();

  const onSubmit = async (data: TTodo) => {
    setStatus("loading");

    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify(data),
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
        toast.success("Todo created successfully");
        reset();
        getTodos();
        setShowModalAdd("close");
      }
    } catch (error: any) {
      setStatus("error");
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.addTodo}>
      <p
        className={styles.title}
        onClick={() => {
          setShowModalAdd("open");
        }}
      >
        <Link href="#">
          <FontAwesomeIcon icon={faPlus} />
        </Link>
        {t("newTodo")}
      </p>
      <Dialog
        showModal={showModalAdd}
        setShowModal={setShowModalAdd}
        position="center"
        label={t("newTodo")}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            icon={faStar}
            type="text"
            placeholder={t("todoPlaceholder")}
            {...register("title", {
              required: true,
            })}
            errors={errors.title?.message}
          />
          <textarea
            placeholder={t("descriptionPlaceholder")}
            {...register("description", {
              required: true,
            })}
          />
          <Button disabled={status === "loading"} type="submit">
            {t("create")}
          </Button>
        </Form>
      </Dialog>
    </div>
  );
}
