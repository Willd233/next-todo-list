// Dependencies.
import { faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

// Store.
import { store } from "../store";

// Components.
import Dialog from "@/global/components/dialog/Dialog";
import { Button, Input } from "@/global/components/forms";

// Helpers.
import { dateFormatter } from "@/global/helpers";

// Types.
import { TCompletedProps } from "../types";

// Styles.
import styles from "./styles/Completed.module.scss";
import { api } from "@/global/helpers/api";
import { todoUrl } from "@/global/constants";

export function Completed(props: TCompletedProps) {
  const { getTodos, onDelete } = props;

  const t = useTranslations("Page.Dashboard.Realized");

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
      await api(`${todoUrl}${id}`, {
        method: "PUT",
        body: JSON.stringify({ completed }),
      });

      setStatus("success");
      toast.success(t("success"));
      getTodos();
    } catch (error: any) {
      setStatus("error");
      toast.error(error.message);
    }
  };

  return (
    <>
      {todos.length > 0 &&
        todos
          .filter((todo) => todo.completed === true)
          .map(({ title, description, completed, _id, createdAt }) => (
            <li key={_id} className={`${styles.itemContainer}`}>
              <div className={styles.todoItem}>
                <Input
                  name="checkbox"
                  icon={faStar}
                  checked={completed}
                  type="checkbox"
                  onChange={(e) => {
                    e.preventDefault();
                    onCompleted(_id, !completed);
                  }}
                />

                <h3
                  className={styles.TodoTitle}
                  onClick={() => handleOpenDescriptionDialog(_id)}
                >
                  {title}
                </h3>
              </div>

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
                      size="small"
                      icon={faTrash}
                    >
                      {t("delete")}
                    </Button>
                  </div>
                </div>
              </Dialog>
            </li>
          ))}
    </>
  );
}
