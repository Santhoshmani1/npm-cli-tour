import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import sleep from "../utils/sleep.js";
import select from "@inquirer/select";
import { createSpinner } from "nanospinner";
import { exec } from "node:child_process";
import { projectDir } from "./init.js";

const installDevDepWelcome = "3. npm install --save-dev <package-name>";
const installDevDepNotes = chalk.blueBright(
  "npm install --save-dev helps you to install external packages as development dependency\n"
);

function installDevDepSuccess(packageName: String) {
  console.log(
    chalk.green(
      `${packageName} installed as development dependency successfully`
    )
  );
}

async function installDevDep(answer: String) {
  return new Promise((resolve, reject) => {
    exec(
      `cd ${projectDir} && npm install --save-dev ${answer}`,
      (error, stdout, stderr) => {
        if (error) {
          console.warn(error);
          reject(stderr);
        }
        resolve(stdout);
      }
    );
  });
}

async function npmInstallDevDep() {
  const npmInstallDevDepAnimation =
    chalkAnimation.rainbow(installDevDepWelcome);
  npmInstallDevDepAnimation.start();
  await sleep(2000);
  npmInstallDevDepAnimation.stop();
  console.log(installDevDepNotes);
  await sleep(1000);

  const answer = await select({
    message: "Let's install nodemon as devdependency:",
    choices: [
      {
        value: "nodemon",
      },
    ],
  });

  const spinner = createSpinner();
  console.log(chalk.yellow("npm install ", answer));
  spinner.start();
  await sleep(1000);
  spinner.stop();

  await installDevDep(answer)
    .then(() => installDevDepSuccess(answer))
    .catch((error) => console.error(error));
}

export default npmInstallDevDep;
