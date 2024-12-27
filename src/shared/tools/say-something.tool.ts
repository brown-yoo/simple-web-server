export const saySomething = (sentence: string) => {
  // print with timestamp
  console.log(`${new Date().toISOString()} - ${sentence}`);
};
