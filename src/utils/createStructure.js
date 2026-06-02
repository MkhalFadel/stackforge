const fs = require("fs-extra");
const path = require("path");
const logger = require("./logger");
const initGit = require("./initGit");
const frontendFrameworks = require("../config/frontendFrameworks");
const {setupFrontend, setupBackend, setupFullstack} = require("./utils")

async function createStructure(projectName, config) {

   const root = path.join(process.cwd(), projectName);

   const type = config.type;

   await fs.ensureDir(root);

   const framework = frontendFrameworks[config.frontendFramework];
   
   if (type === "frontend") {
      await setupFrontend(config, root, framework)
   }

   else if (type === "backend") {
      await setupBackend(config, root);
   }

   else {
      await setupFullstack(config, root, framework)
   }

   if (config.git) await initGit(root);

   logger.success("Project structure created!");
}

module.exports = createStructure;