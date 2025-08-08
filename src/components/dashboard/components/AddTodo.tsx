// Dependencies
import { toast } from "react-toastify";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// Store
import { store } from "../store";

// Components
import { Button, Form, Input } from "@/global/components/forms";
import Dialog from "@/global/components/dialog/Dialog";

// Helpers
import { api } from "@/global/helpers/api";

// Constants
import { todoUrl } from "@/global/constants";

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
      await api(todoUrl, {
        method: "POST",
        body: JSON.stringify(data),
      });

      setStatus("success");
      toast.success(t("taskCreated"));
      reset();
      getTodos();
      setShowModalAdd("close");
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
        position="right"
        label={t("newTodo")}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder={t("todoPlaceholder")}
            {...register("title", {
              required: true,
            })}
            errors={errors.title?.message}
          />
          <textarea
            className={styles.descriptionInput}
            placeholder={t("descriptionPlaceholder")}
            {...register("description", {
              required: false,
            })}
          />
          <Button
            disabled={status === "loading"}
            type="submit"
            className={styles.button}
          >
            {t("create")}
          </Button>
        </Form>
      </Dialog>
    </div>
  );
}
