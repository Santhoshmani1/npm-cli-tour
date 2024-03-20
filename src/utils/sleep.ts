const sleep = (ms: number = 3000): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default sleep;
