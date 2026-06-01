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
const setupAuth = require("../features/auth");
const setupESLint = require("../features/codeQuality/setupESLint");
const setupPrettier = require("../features/codeQuality/setupPrettier");
const updatePackageScripts = require("../utils/updatePackageScripts");
const installCodeQualityPackages = require("../utils/installQualityPackages")

async function createStructure(projectName, config) {

   const root = path.join(process.cwd(), projectName);

   const type = config.type;

   await fs.ensureDir(root);

   const framework = frontendFrameworks[config.frontendFramework];
   if (type === "frontend") {

      await copyTemplate(framework.template, root);
      if (config.install && framework.needsInstall)
      {
         await installDependencies(root);
         
         await installCodeQualityPackages(
            root,
            config.eslint,
            config.prettier
         );
      } 

      if (config.tailwind) await await setupTailwind(root, config.frontendFramework);

      if (config.eslint) await setupESLint(root);

      if (config.prettier) await setupPrettier(root);

      await updatePackageScripts(
         root,
         config.eslint,
         config.prettier
      );
   }

   else if (type === "backend") {
      await copyTemplate("backend", root);
      if (config.auth) await setupAuth(root);
      
      if (!config.prisma) await setupPrisma(root);
      
      await createEnv(root, config);
      
      if (config.eslint) await setupESLint(root);

      if (config.prettier) await setupPrettier(root);

      await updatePackageScripts(
         root,
         config.eslint,
         config.prettier
      );
      
      if (config.install) 
      {
            await installDependencies(root);
            
            await installDatabasePackages(
               root,
               config.database,
               config.prisma
            );
            
            await installCodeQualityPackages(
               root,
               config.eslint,
               config.prettier
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

      if (config.auth) await setupAuth(backendPath);

      if (!config.prisma) await setupPrisma(backendPath);

      await createEnv(backendPath, config);

      if (config.eslint) 
      {
         await setupESLint(frontendPath);
         await setupESLint(backendPath);
      }

      if (config.prettier) 
      {
         await setupPrettier(frontendPath);
         await setupPrettier(backendPath);
      }
      
      await updatePackageScripts(
         frontendPath,
         config.eslint,
         config.prettier
      );
      
      await updatePackageScripts(
         backendPath,
         config.eslint,
         config.prettier
      );

      if (config.tailwind) await setupTailwind(frontendPath, config.frontendFramework);
      
      if (config.install) {
         if(framework.needsInstall) await installDependencies(frontendPath);
         
         await installCodeQualityPackages(
            frontendPath,
            config.eslint,
            config.prettier
         );


         await installDependencies(backendPath);
         
         await installDatabasePackages(
            backendPath,
            config.database,
            config.prisma
         );

         await installCodeQualityPackages(
            backendPath,
            config.eslint,
            config.prettier
         );
      }
   }

   if (config.git) await initGit(root);

   logger.success("Project structure created!");
}

module.exports = createStructure;