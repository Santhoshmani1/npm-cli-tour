#!/usr/bin/env node
import welcome from "./utils/welcome.js";
import { npmInit } from "./commands/init.js";
import npmInstall from "./commands/depInstall.js";
import npmInstallDevDep from "./commands/devDepInstall.js";
import npmUnInstall from "./commands/uninstall.js";
import finish from "./utils/finish.js";
await welcome();
await npmInit();
await npmInstall();
await npmInstallDevDep();
await npmUnInstall();
await finish();
