import { saySomething } from "./say-something.tool";

describe("saySomething", () => {
  it("should print a sentence with timestamp", () => {
    // Arrange
    const sentence = "Hello, World!";

    // Act
    saySomething(sentence);

    // Assert
    // This is a manual test, you should see the sentence with timestamp in the console
  });
});
