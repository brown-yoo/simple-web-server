import { Logger } from "@shared/tools/logger";
import { Developer, DeveloperSchema } from "@shared/types";
import { printDeveloper } from "./print.tool";
import { readRawDevelopers } from "./read.tool";
import { write } from "../fs";

export const writeDeveloper = (developer: Developer) => {
  const logger = new Logger(["writeDeveloper"]);

  logger.info(`새로운 개발자를 추가합니다 - ${printDeveloper(developer)}`);

  const loaded = readRawDevelopers();

  const exists = loaded.developers.find(
    (d) => d.name === developer.name && d.team === developer.team
  );

  if (exists) {
    logger.error(`이미 존재하는 개발자입니다 - ${printDeveloper(developer)}`);
    return {
      result: false,
      developers: loaded.developers,
    };
  }

  const validatedDeveloper = DeveloperSchema.validateSync(developer);

  loaded.developers.push(validatedDeveloper);
  write("developers.raw.json", loaded);

  return {
    result: true,
    developers: loaded.developers,
  };
};
