import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import sleep from "../utils/sleep.js";
import select from "@inquirer/select";
import { createSpinner } from "nanospinner";
import { exec } from "node:child_process";
import { projectDir } from "./init.js";

const installWelcome = "2. npm install <package-name>";
const installNotes = chalk.blueBright(
  "npm install helps you to install external packages & provides the ability to use them in your projects\n"
);

function installSuccess(packageName: String) {
  console.log(chalk.green(`${packageName} installed successfully`));
}

async function installPackage(answer: String) {
  return new Promise((resolve, reject) => {
    exec(
      `cd ${projectDir} && npm install ${answer}`,
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

async function npmInstall() {
  const npmInstallAnimation = chalkAnimation.rainbow(installWelcome);
  npmInstallAnimation.start();
  await sleep(2000);
  npmInstallAnimation.stop();
  console.log(installNotes);
  await sleep(1000);

  const answer = await select({
    message: "Pick a package to install:",
    choices: [
      {
        value: "chalk",
      },
      {
        value: "uuid",
      },
    ],
  });

  const spinner = createSpinner();
  console.log(chalk.yellow("npm install ", answer));
  spinner.start();
  await sleep(1000);
  spinner.stop();

  await installPackage(answer)
    .then(() => installSuccess(answer))
    .catch((error) => console.error(error));
}

export default npmInstall;
