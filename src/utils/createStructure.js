const fs = require("fs-extra");
const path = require("path");
const logger = require("./logger");
const copyTemplate = require("./copyTemplate");
const installDependencies = require("./installDependencies");
const initGit = require("./initGit");
const createEnv = require("./createEnv");
const installDatabasePackages = require("../features/database/index");
const frontendFrameworks = require("../config/frontendFrameworks");
const setupTailwind = require("../features/tailwind");
const setupPrisma = require("../features/prisma");

async function createStructure(projectName, config) {

   const root = path.join(process.cwd(), projectName);

   const type = config.type;

   await fs.ensureDir(root);

   const framework = frontendFrameworks[config.frontendFramework];
   if (type === "frontend") {

      await copyTemplate(framework.template, root);
      if (config.install && framework.needsInstall) await installDependencies(root);

      if (config.tailwind) await await setupTailwind(root, config.frontendFramework);
   }

   else if (type === "backend") {
      await copyTemplate("backend", root);
      
      if (!config.prisma) await removePrisma(root);
      
      await createEnv(root, config.database);
      
      if (config.install) 
      {
         await installDependencies(root);
         
         await installDatabasePackages(
            root,
            config.database,
            config.prisma
         );
      }

   }

   else {
      const frontendPath = path.join(root, "frontend");
      const backendPath = path.join(root, "backend");

      await fs.ensureDir(frontendPath);
      await fs.ensureDir(backendPath);

      await copyTemplate(`frontend/${config.frontendFramework}`, frontendPath);
      await copyTemplate("backend", backendPath);

      if (!config.prisma) await removePrisma(backendPath);

      await createEnv(
         backendPath,
         config.database
      );

      if (config.install) {
         if(framework.needsInstall)
         await installDependencies(frontendPath);
         
         if (config.tailwind) await await setupTailwind(frontendPath, config.frontendFramework);

         await installDependencies(backendPath);
         
         await installDatabasePackages(
            backendPath,
            config.database,
            config.prisma
         );
      }
   }

   if (config.git) {
      await initGit(root);
   }
   
   logger.success("Project structure created!");
}

module.exports = createStructure;