import Dialog from "@/components/dialog/Dialog.component";
import { Input } from "@/components/forms";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { store } from "../store";

import styles from "./styles/TodoStyles.module.scss";
import { toast } from "react-toastify";

type TTodosProps = {
  getTodos: () => Promise<never[] | undefined>;
};

export function Todos({ getTodos }: TTodosProps) {
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
          .map(({ title, description, completed, _id }) => (
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
                  position="center"
                  label={title}
                >
                  <p>{description}</p>
                </Dialog>
              </div>
            </li>
          ))}
    </>
  );
}
