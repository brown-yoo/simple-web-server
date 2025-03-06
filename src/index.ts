import { Logger } from "@shared/tools";
import { serverApp } from "./apps";
import { ValidationError } from "yup";

export const App = async () => {
  const logger = new Logger(["App"]);

  logger.info("App is running");

  try {
    serverApp();
  } catch (e: any) {
    if (e instanceof ValidationError) {
      logger.error(e.errors.join("\n"));
      return;
    }

    logger.error(e.message);
  }
};

App();
