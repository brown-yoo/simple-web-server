import { Logger, read } from "@shared/tools";
import { useSharedStore } from "@shared/stores";
import inquirer from "inquirer";
import { readRawDevelopers } from "@shared/tools/assets/developer/read.tool";
import { printDeveloper } from "@shared/tools/assets/developer/print.tool";
import { writeDeveloper } from "@shared/tools/assets/developer/write.tool";
import { DeveloperSchema, RawTeams } from "@shared/types";

export const DemoApp = async () => {
  const logger = new Logger(["DemoApp"]);

  logger.debug("DemoApp is running");

  const storedData = readRawDevelopers();
  const choices: any[] = storedData.developers.map((developer) => ({
    name: printDeveloper(developer),
    value: developer,
  }));

  choices.push({
    name: "🚨 새로 추가하기",
    value: "new",
    description: "새로운 개발자를 추가합니다",
  });

  const response = await inquirer.prompt([
    {
      type: "list",
      name: "developer",
      message: "작업 전에 누구인지 알려주세요",
      choices,
    },
  ]);

  if (response.developer === "new") {
    logger.info("새로운 개발자를 추가합니다");

    const loadedTeams = read<RawTeams>("teams.raw.json");

    const newDeveloper = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "이름을 입력해주세요",
      },
      {
        type: "list",
        name: "team",
        message: "팀을 선택해주세요",
        choices: loadedTeams.map((team) => team.name),
      },
    ]);

    const validatedDeveloper = DeveloperSchema.validateSync(newDeveloper);

    logger.info(
      `새로운 개발자를 추가합니다 - ${printDeveloper(validatedDeveloper)}`
    );

    const response = writeDeveloper(validatedDeveloper);

    if (!response?.result) {
      logger.error(
        `이미 존재하는 개발자입니다 - ${printDeveloper(validatedDeveloper)}`
      );
      return;
    }

    useSharedStore.getState().setCurrentWorker(validatedDeveloper);
  } else {
    useSharedStore.getState().setCurrentWorker(response.developer);
  }

  logger.info(
    `안녕하세요 '${useSharedStore.getState().currentWorker?.name} / ${
      useSharedStore.getState().currentWorker?.team
    }' 님!`
  );
};
