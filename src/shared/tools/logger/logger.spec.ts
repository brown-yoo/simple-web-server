import dayjs from "dayjs";
import { Logger } from "./logger.tool";
import { LoggerType } from "./logger.type";
import picocolors from "picocolors";

// TODO: winston 라이브러리를 사용하여 로그를 출력하도록 수정한다.
const generatePrefix = (timestamp: string, type: LoggerType, stack: string) => {
  const alignedType = type.padStart(7, " ");
  if (stack === "") {
    return `${timestamp} - ${alignedType}`;
  }
  return `${timestamp} - ${alignedType} [${stack}]`;
};

describe("Logger", () => {
  let logger: Logger;
  let now: string;
  const EXPECTED_LOGGING_SENTENCE = "테스트 로그입니다";

  beforeEach(() => {
    logger = new Logger(["TEST"]);
    now = dayjs().format("YYYY-MM-DD HH:mm:ss");
  });

  it("인스턴스가 생성된다", () => {
    expect(logger).toBeTruthy();
  });

  it("log 타입 로그가 출력된다", () => {
    const spy = jest.spyOn(console, "log");
    logger.log(EXPECTED_LOGGING_SENTENCE);
    expect(spy).toHaveBeenCalledWith(
      `${generatePrefix(now, "LOG", "TEST")} ${EXPECTED_LOGGING_SENTENCE}`
    );
  });

  it("info 타입 로그가 출력된다", () => {
    const spy = jest.spyOn(console, "info");
    logger.info(EXPECTED_LOGGING_SENTENCE);
    expect(spy).toHaveBeenCalledWith(
      picocolors.green(
        `${generatePrefix(now, "INFO", "TEST")} ${EXPECTED_LOGGING_SENTENCE}`
      )
    );
  });

  it("warn 타입 로그가 출력된다", () => {
    const spy = jest.spyOn(console, "warn");
    logger.warn(EXPECTED_LOGGING_SENTENCE);
    expect(spy).toHaveBeenCalledWith(
      picocolors.yellow(
        `${generatePrefix(now, "WARN", "TEST")} ${EXPECTED_LOGGING_SENTENCE}`
      )
    );
  });

  it("error 타입 로그가 출력된다", () => {
    const spy = jest.spyOn(console, "error");
    logger.error(EXPECTED_LOGGING_SENTENCE);
    expect(spy).toHaveBeenCalledWith(
      picocolors.red(
        `${generatePrefix(now, "ERROR", "TEST")} ${EXPECTED_LOGGING_SENTENCE}`
      )
    );
  });

  it("debug 타입 로그가 출력된다", () => {
    const spy = jest.spyOn(console, "debug");
    logger.debug(EXPECTED_LOGGING_SENTENCE);
    expect(spy).toHaveBeenCalledWith(
      picocolors.gray(
        `${generatePrefix(now, "DEBUG", "TEST")} ${EXPECTED_LOGGING_SENTENCE}`
      )
    );
  });

  it("스택이 없을 때 로그가 출력된다", () => {
    const loggerWithoutStack = new Logger([]);
    const spy = jest.spyOn(console, "log");
    loggerWithoutStack.log(EXPECTED_LOGGING_SENTENCE);
    expect(spy).toHaveBeenCalledWith(
      `${generatePrefix(now, "LOG", "")} ${EXPECTED_LOGGING_SENTENCE}`
    );
  });
});
