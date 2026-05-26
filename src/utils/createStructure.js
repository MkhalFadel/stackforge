const fs = require("fs-extra");
const path = require("path");
const logger = require("./logger");
const copyTemplate = require("./copyTemplate");
const installDependencies = require("./installDependencies");
const initGit = require("./initGit");

async function createStructure(projectName, type) {

   const root = path.join(process.cwd(), projectName);

   await fs.ensureDir(root);

   if (type === "frontend") {
      await copyTemplate("frontend", root);
      await installDependencies(root)
   }

   else if (type === "backend") {
      await copyTemplate("backend", root);
      await installDependencies(root)
   }

   else {
      const frontendPath = path.join(root, "frontend");
      const backendPath = path.join(root, "backend");

      await fs.ensureDir(frontendPath);
      await fs.ensureDir(backendPath);

      await copyTemplate("frontend", frontendPath);
      await copyTemplate("backend", backendPath);

      await installDependencies(frontendPath);
      await installDependencies(backendPath);
   }

   await initGit(root);
   logger.success("Project structure created!");
}

module.exports = createStructure;