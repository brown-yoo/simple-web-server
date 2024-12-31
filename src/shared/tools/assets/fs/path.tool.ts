import path from "path";

export const getPath = (fileName: string) => {
  return path.join(__dirname, "..", "..", "..", "..", "assets", fileName);
};
