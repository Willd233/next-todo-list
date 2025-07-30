import { create } from "zustand";

type TStatus = "Idle" | "Loading" | "Success" | "Error";

type TState = {
  status: TStatus;
  setStatus: (status: TStatus) => void;
};

export const store = create<TState>((set) => ({
  status: "Idle",
  setStatus: (status) => set({ status }),
}));
