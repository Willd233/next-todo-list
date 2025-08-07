// Dependencies.
import { faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

// Store.
import { store } from "../store";

// Components.
import Dialog from "@/components/dialog/Dialog";
import { Button, Input } from "@/components/forms";

// Helpers.
import { dateFormatter } from "@/global/helpers";

// Types.
import { TCompletedProps } from "../types";

// Styles.
import styles from "./styles/Completed.module.scss";

export function Completed(props: TCompletedProps) {
  const { getTodos, onDelete } = props;

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
                  onClick={() => handleOpenDescriptionDialog(_id)}
                  className={styles.TodoTitle}
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
                  <h5 className={styles.descriptionTitle}>description</h5>
                  <p className={styles.description}>- {description}</p>
                  <div className={styles.buttonsContainer}>
                    <Button
                      onClick={() => onDelete(_id)}
                      className={styles.deleteButton}
                      type="button"
                      variant="small"
                      icon={faTrash}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Dialog>
            </li>
          ))}
    </>
  );
}
