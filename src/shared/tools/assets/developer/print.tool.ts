import { Developer } from "@shared/types";

export const printDeveloper = (developer: Developer) =>
  `${developer.name} (${developer.team})`;
