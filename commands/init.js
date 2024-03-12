import fs from "fs";
import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import sleep from "../utils/sleep.js";

export default async function npmInit() {
  console.log(chalk.bold("Let's get started\n"));
  const npmInit = chalkAnimation.rainbow("1. npm init");
  await sleep(3000);
  npmInit.start();
  npmInit.stop();

  console.log(
    chalk.blueBright(
      "npm init creates a package.json file, it is the heart of any Node.js project. It contains the metadata of the project and the dependencies\n"
    )
  );

  await sleep(1000);

  let { name } = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "Name of the project",
    default: "my-first-project",
  });
  name = name.replace(" ", "-");
  const { version } = await inquirer.prompt({
    type: "input",
    name: "version",
    message: "version",
    default: "1.0.0",
  });
  const { description } = await inquirer.prompt({
    type: "input",
    name: "description",
    message: "Description of your project?",
    default: "",
  });
  const { main } = await inquirer.prompt({
    name: "main",
    type: "input",
    message: "entrypoint of the project",
    default: "index.js",
  });
  const { author } = await inquirer.prompt({
    type: "input",
    name: "author",
    message: "Author",
    default: "",
  });
  const packageJson = {
    name,
    description,
    author,
    version,
    main,
    scripts: {
      start: "node index.js",
      test: 'echo "Error: no test specified" && exit 1',
    },
    keywords: [],
    license: "ISC",
  };
  fs.mkdir(name, (err) => {
    err && console.log(err) ;
  });
  fs.writeFileSync(
    name + "/package.json",
    JSON.stringify(packageJson, null, 2)
  );

  console.log(
    chalk.green("project initiated & package.json created successfully!")
  );
}
