import { TModal, TStatus } from "@/global/types";

export type AddTodoProps = {
  getTodos: () => Promise<never[] | undefined>;
};

export type TCompletedProps = {
  getTodos: () => Promise<never[] | undefined>;
  onDelete: (id: string) => Promise<void>;
};

export type TTodosProps = {
  getTodos: () => Promise<never[] | undefined>;
  onDelete: (id: string) => Promise<void>;
};

export type TTodo = {
  title: string;
  description: string;
  completed: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
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
