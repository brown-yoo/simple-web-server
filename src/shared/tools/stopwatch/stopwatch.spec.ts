import { StopWatch } from "./stopwatch.tool";

describe("StopWatch", () => {
  let stopWatch: StopWatch;

  beforeEach(() => {
    stopWatch = new StopWatch();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("인스턴스가 생성된다", () => {
    expect(stopWatch).toBeTruthy();
  });

  it("tick 메서드가 호출되면 laps 배열에 Lap이 추가된다", () => {
    stopWatch.tick("Lap 1");
    expect(stopWatch.getLaps().length).toBe(1);
  });

  it("getLapByName 메서드가 호출되면 해당 이름의 Lap이 반환된다", () => {
    stopWatch.tick("Lap 1");
    const lap = stopWatch.getLapByName("Lap 1");
    expect(lap.name).toBe("Lap 1");
  });

  it("getLapByName 메서드가 호출되면 해당 이름의 Lap이 반환된다", () => {
    const delay = 1000;
    stopWatch.tick("Lap 1");
    setTimeout(() => {
      stopWatch.tick("Lap 2");
      const diff = stopWatch.diffByName("Lap 1", "Lap 2");
      expect(diff).toBeGreaterThanOrEqual(delay);
    }, delay);
    jest.runAllTimers();
  });

  it("setLaps 메서드가 호출되면 기존 laps 배열을 덮어쓴다", () => {
    stopWatch.tick("Lap 1");
    stopWatch.setLaps([]);
    expect(stopWatch.getLaps().length).toBe(0);
  });

  it("nextSequentialNameOfLap 메서드가 호출되면 다음 순차적인 Lap 이름을 반환한다", () => {
    stopWatch.tick("Lap 1");
    const nextName = stopWatch["nextSequentialNameOfLap"];
    expect(nextName).toBe("Lap 2");
  });

  it("이름으로 Lap을 찾을 수 있다", () => {
    stopWatch.tick("Lap 1");
    const lap = stopWatch.getLapByName("Lap 1");
    expect(lap.name).toBe("Lap 1");

    expect(() => {
      stopWatch.getLapByName("Lap 2");
    }).toThrow(new Error("Lap not found"));
  });

  it("두 Lap의 시간 차이를 구할 수 있다", () => {
    stopWatch.tick("Lap 1");

    setTimeout(() => {
      stopWatch.tick("Lap 2");
      const diff = stopWatch.diff(
        stopWatch.getLapByName("Lap 1"),
        stopWatch.getLapByName("Lap 2")
      );
      expect(diff).toBeGreaterThanOrEqual(1);
    }, 1000);
    jest.runAllTimers();
  });

  it("현재 시간과 Lap의 시간 차이를 구할 수 있다", () => {
    stopWatch.tick("Lap 1");
    const diff = stopWatch.diffFromNow(stopWatch.getLapByName("Lap 1"));
    expect(diff).toBeGreaterThanOrEqual(0);
  });

  it("Lap을 출력할 수 있다", () => {
    stopWatch.tick("Lap 1");
    stopWatch.tick("Lap 2");
    stopWatch.print();
  });
});
