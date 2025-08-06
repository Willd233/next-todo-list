import Dialog from "@/components/dialog/Dialog.component";
import { Input } from "@/components/forms";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { store } from "../store";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import styles from "./styles/TodoStyles.module.scss";

type TCompletedProps = {
  getTodos: () => Promise<never[] | undefined>;
};

export function Completed({ getTodos }: TCompletedProps) {
  const { todos, selectedTodoId, setStatus, setSelectedTodoId } = store();

  const t = useTranslations("Page.Dashboard");

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
          .map(({ title, description, completed, _id }) => (
            <li key={_id} className={`${styles.itemContainer}`}>
              <div className={`${styles.todoItem} `}>
                <Input
                  className={completed ? styles.completed : ""}
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
                  className={`${styles.TodoTitle}          ${
                    completed ? styles.completed : ""
                  } `}
                >
                  {title}
                </h3>
              </div>
              <Dialog
                showModal={selectedTodoId === _id ? "open" : "close"}
                setShowModal={handleCloseDescriptionDialog}
                position="center"
                label={t("description")}
              >
                <p>{description}</p>
              </Dialog>
            </li>
          ))}
    </>
  );
}
