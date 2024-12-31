import { Logger } from "@shared/tools";
import { DemoApp } from "./apps";

export const App = () => {
  const logger = new Logger(["App"]);

  logger.info("App is running");

  DemoApp();
};

App();
