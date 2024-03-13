import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import sleep from "../utils/sleep.js";
import select from "@inquirer/select";
import { createSpinner } from "nanospinner";
import { exec } from "node:child_process";
import { projectDir } from "./init.js";
import inquirer from "inquirer";

const unInstallWelcome = "4. npm uninstall <package-name>";
const unInstallNotes = chalk.blueBright(
  "npm uninstall removes packages from your project\n"
);

function unInstallSuccess(packageName) {
  console.log(chalk.green(`${packageName} uninstalled successfully`));
}

async function unInstallPackage(answer) {
  return new Promise((resolve, reject) => {
    exec(
      `cd ${projectDir} && npm uninstall ${answer}`,
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

async function npmUnInstall() {
  const npmUnInstallAnimation = chalkAnimation.rainbow(unInstallWelcome);
  npmUnInstallAnimation.start();
  await sleep(2000);
  npmUnInstallAnimation.stop();
  console.log(unInstallNotes);
  await sleep(1000);

  const unwantedPackage = await inquirer.prompt([
    {
      type: "input",
      name: "packageName",
      message: "Enter the package name to uninstall:",
    },
  ]);

  const { packageName } = unwantedPackage;

  const spinner = createSpinner();
  console.log(chalk.yellow("npm uninstall ", packageName));
  spinner.start();
  await sleep(1000);
  spinner.stop();

  await unInstallPackage(packageName)
    .then(() => unInstallSuccess(packageName))
    .catch((error) => console.error(error));
}

export default npmUnInstall;
