import fs from "fs";
import path from "path";
import { Logger } from "../../logger";
import { getPath } from "./path.tool";

export const read = <T = unknown>(fileName: string): T => {
  const logger = new Logger(["read"]);

  const uri = getPath(fileName);

  logger.info(`데이터를 읽습니다 - ${uri}`);

  if (fs.existsSync(uri)) {
    logger.info(`파일을 찾았습니다 - ${uri}`);
    return JSON.parse(fs.readFileSync(uri, { encoding: "utf-8" }));
  }

  throw new Error(`File not found: ${uri}`);
};
