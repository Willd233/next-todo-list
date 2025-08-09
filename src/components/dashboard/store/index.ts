// Dependencies.
import { create } from "zustand";

// Types.
import { TState } from "../types";

export const store = create<TState>((set) => ({
  status: "idle",
  onDescription: false,
  setStatus: (status) => set({ status }),
  todos: [],
  setTodos: (todos) => set({ todos }),
  showModalAdd: "close",
  setShowModalAdd: (showModalAdd) => set({ showModalAdd }),
  selectedTodoId: null,
  setSelectedTodoId: (id) => set({ selectedTodoId: id }),
  setOnDescription: (onDescription) => set({ onDescription }),
}));
