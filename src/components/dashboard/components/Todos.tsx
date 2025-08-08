// Dependencies.
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { faStar, faTrash } from "@fortawesome/free-solid-svg-icons";

// Store.
import { store } from "../store";

// Components.
import Dialog from "@/global/components/dialog/Dialog";
import { Button, Input } from "@/global/components/forms";

// Helpers
import { dateFormatter } from "@/global/helpers";

// Types.
import { TTodosProps } from "../types";

// Styles.
import styles from "./styles/Todos.module.scss";

export function Todos(props: TTodosProps) {
  const { getTodos, onDelete } = props;

  const t = useTranslations("Page.Dashboard.Todos");

  const { todos, selectedTodoId, setStatus, setSelectedTodoId } = store();

  const handleOpenDescriptionDialog = (id: string) => {
    setSelectedTodoId(id);
  };

  const handleCloseDescriptionDialog = () => {
    setSelectedTodoId(null);
  };

  const onCompleted = async (id: string, completed: boolean) => {
    setStatus("loading");

    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        body: JSON.stringify({ completed }),
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
        toast.success("Todo updated successfully");
        getTodos();
      }
    } catch (error: any) {
      setStatus("error");
      toast.error(error.message);
    }
  };

  return (
    <>
      {todos.length > 0 &&
        todos
          .filter((todo) => todo.completed === false)
          .map(({ title, description, completed, _id, createdAt }) => (
            <li key={_id} className={styles.itemContainer}>
              <div className={styles.todoItem}>
                <Input
                  name="checkbox"
                  icon={faStar}
                  checked={completed}
                  type="checkbox"
                  onChange={() => onCompleted(_id, !completed)}
                />
                <h3
                  className={styles.TodoTitle}
                  onClick={() => handleOpenDescriptionDialog(_id)}
                >
                  {title}
                </h3>
                <Dialog
                  showModal={selectedTodoId === _id ? "open" : "close"}
                  setShowModal={handleCloseDescriptionDialog}
                  position="right"
                  label={title}
                >
                  <div>
                    <h4>{dateFormatter(createdAt, "D MMMM, YYYY")}</h4>
                    <h5 className={styles.descriptionTitle}>
                      {t("description")}
                    </h5>
                    <p className={styles.description}>- {description}</p>
                    <div className={styles.buttonsContainer}>
                      <Button
                        onClick={() => onDelete(_id)}
                        className={styles.deleteButton}
                        type="button"
                        variant="small"
                        icon={faTrash}
                      >
                        {t("delete")}
                      </Button>
                    </div>
                  </div>
                </Dialog>
              </div>
            </li>
          ))}
    </>
  );
}
