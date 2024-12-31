import { createStore } from "zustand/vanilla";
import { SharedStore, Worker } from "./shared.type";

export const useSharedStore = createStore<SharedStore>((set) => ({
  currentWorker: null,
  setCurrentWorker: (worker: Worker) => set({ currentWorker: worker }),
}));
