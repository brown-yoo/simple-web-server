import { Logger } from "@shared/tools";
import { DemoApp } from "./apps";
import { ValidationError } from "yup";

export const App = async () => {
  const logger = new Logger(["App"]);

  logger.info("App is running");

  try {
    await DemoApp();
  } catch (e: any) {
    if (e instanceof ValidationError) {
      logger.error(e.errors.join("\n"));
      return;
    }

    logger.error(e.message);
  }
};

App();
