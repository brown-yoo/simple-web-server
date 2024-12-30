import { clone } from "es-toolkit";
import { Logger } from "../logger";
import { Lap } from "./stopwatch.type";

const AUTO_GENERATED_LAP_NAME = "Lap";

export class StopWatch {
  private laps: Array<Lap>;

  constructor(private readonly logger: Logger = new Logger(["STOPWATCH"])) {
    this.laps = [];
  }

  public setLaps(laps: Lap[]): void {
    this.logger.warn("기존 기록을 덮어 쓸 수 있습니다.");
    this.laps = laps;
  }

  private get nextSequentialNameOfLap(): string {
    const maxNumber = this.laps
      .filter((lap) => lap.name.startsWith(AUTO_GENERATED_LAP_NAME))
      .map((lap) => parseInt(lap.name.replace(AUTO_GENERATED_LAP_NAME, ""), 10))
      .reduce((max, number) => Math.max(max, number), 0);

    return `${AUTO_GENERATED_LAP_NAME} ${maxNumber + 1}`;
  }

  public tick(name: string): void {
    this.laps.push({ name, time: Date.now() });
  }

  public getLaps(): Lap[] {
    return clone(this.laps);
  }

  public getLapByName(name: string): Lap {
    const lap = this.laps.find((lap) => lap.name === name);

    if (!lap) {
      throw new Error("Lap not found");
    }

    return clone(lap);
  }

  public diff(lap1: Lap, lap2: Lap): number {
    return lap2.time - lap1.time;
  }

  public diffByName(name1: string, name2: string): number {
    const lap1 = this.getLapByName(name1);
    const lap2 = this.getLapByName(name2);

    return this.diff(lap1, lap2);
  }

  public diffFromNow(lap: Lap): number {
    return this.diff(lap, { name: "Now", time: Date.now() });
  }

  public print(laps: Lap[] = this.laps): void {
    laps.forEach((lap) => {
      this.logger.info(`${lap.name}: ${lap.time}`);
    });
  }
}
