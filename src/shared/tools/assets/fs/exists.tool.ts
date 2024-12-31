import fs from "fs";
import path from "path";
import { getPath } from "./path.tool";

export const exists = (fileName: string): boolean => {
  const uri = getPath(fileName);
  return fs.existsSync(uri);
};
