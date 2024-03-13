import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";
import sleep from "./sleep.js";

async function welcome() {
  console.log(
    gradient.rainbow(
      figlet.textSync("npm-cli-tour", { horizontalLayout: "full" })
    )
  );
  let welcomeText = chalkAnimation.rainbow("Welcome to npm-cli-tour\n\n");
  await sleep(3000);
  welcomeText.stop();
}

export default welcome;
