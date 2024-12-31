import { Developer } from "../../types/assets";

export type Worker = Developer;

export interface SharedStore {
  currentWorker: Worker | null;
  setCurrentWorker: (worker: Worker) => void;
}
