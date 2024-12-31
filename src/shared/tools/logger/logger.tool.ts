import dayjs from "dayjs";
import { LoggerType } from "./logger.type";
import picocolors from "picocolors";

export class Logger {
  constructor(private readonly stacks: string[]) {}

  private get timestamp() {
    return dayjs().format("YYYY-MM-DD HH:mm:ss.SSS");
  }

  private get stack() {
    return this.stacks.join(" > ");
  }

  private prefix(type: LoggerType) {
    const alignedType = type.padStart(5, " ");
    if (this.stack === "") {
      return `${this.timestamp} - ${alignedType}`;
    }
    return `${this.timestamp} - ${alignedType} [${this.stack}]`;
  }

  private format(type: LoggerType, message: string) {
    const prefix = this.prefix(type);
    return `${prefix} ${message}`;
  }

  public log(message: string) {
    console.log(this.format("LOG", message));
  }

  public info(message: string) {
    console.info(picocolors.green(this.format("INFO", message)));
  }

  public warn(message: string) {
    console.warn(picocolors.yellow(this.format("WARN", message)));
  }

  public error(message: string) {
    console.error(picocolors.red(this.format("ERROR", message)));
  }

  public debug(message: string) {
    console.debug(picocolors.gray(this.format("DEBUG", message)));
  }
}
