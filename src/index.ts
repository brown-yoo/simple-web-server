import { Logger } from "@shared/tools";

export const App = () => {
  const logger = new Logger(["App"]);
  logger.info("App is running");
};

App();
