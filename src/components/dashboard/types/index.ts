import { TModal, TStatus } from "@/global/types";

export type TTodo = {
  title: string;
  description: string;
  completed: boolean;
  _id: string;
};
export type TState = {
  status: TStatus;
  todos: TTodo[];
  showModalAdd: TModal;
  selectedTodoId: string | null;
  setStatus: (status: TStatus) => void;
  setTodos: (todos: TTodo[]) => void;
  setShowModalAdd: (showModalAdd: TModal) => void;
  setSelectedTodoId: (id: string | null) => void;
};
