import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import sleep from "./sleep.js";

async function finish() {
  const finalGreetings = chalkAnimation.rainbow(
    "congratulations for getting started with npm. Now It's time to build something amazing!"
  );
  finalGreetings.start();
  await sleep(2000);
  finalGreetings.stop();
  console.log(chalk.blueBright("All the best"));
  process.exit(0);
}

export default finish;
