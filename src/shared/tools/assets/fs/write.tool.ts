import fs from "fs";
import { Logger } from "../../logger";
import { getPath } from "./path.tool";

export const write = <T = unknown>(fileName: string, data: T): void => {
  const logger = new Logger(["write"]);
  const uri = getPath(fileName);

  logger.info(`데이터를 씁니다 - ${uri}`);

  const result = fs.writeFileSync(uri, JSON.stringify(data, null, 2));

  logger.debug(`데이터를 썼습니다`);

  return result;
};
