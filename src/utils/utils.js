const fs = require("fs-extra");
const path = require("path");
const copyTemplate = require("./copyTemplate");
const installDependencies = require("./installDependencies");
const installCodeQualityPackages = require("./installQualityPackages")
const updatePackageScripts = require("../utils/updatePackageScripts");
const setupESLint = require("../features/codeQuality/setupESLint");
const setupPrettier = require("../features/codeQuality/setupPrettier");
const setupTailwind = require("../features/tailwind");
const setupPrisma = require("../features/prisma");
const setupAuth = require("../features/auth");
const createEnv = require("./createEnv");
const installDatabasePackages = require("../features/database/index");
const applySwagger = require("../features/swagger");


async function setupFrontend(config, root, framework)
{
   await copyTemplate(framework.template, root);
   if (config.install && framework.needsInstall)
   {
      await installDependencies([root]);
      
      await installCodeQualityPackages(
         [root],
         config.eslint,
         config.prettier
      );
   } 

   if (config.tailwind) await setupTailwind(root, config.frontendFramework);

   if (config.eslint) await setupESLint([root]);

   if (config.prettier) await setupPrettier([root]);

   await ensurePackageJson(root)

   await updatePackageScripts(
      [root],
      config.eslint,
      config.prettier
   );
}

async function setupBackend(config, root)
{
   await copyTemplate("backend", root);
   
   if (config.auth) await setupAuth(root);
   
   if (!config.prisma) await setupPrisma(root);

   if(config.swagger) await applySwagger(root, config.install);
   
   await createEnv(root, config);
   
   if (config.eslint) await setupESLint([root]);

   if (config.prettier) await setupPrettier([root]);

   await updatePackageScripts(
      [root],
      config.eslint,
      config.prettier
   );
   
   if (config.install) 
   {
         await installDependencies([root]);
         
         await installDatabasePackages(
            root,
            config.database,
            config.prisma
         );
         
         await installCodeQualityPackages(
            [root],
            config.eslint,
            config.prettier
         );
   }
}

async function setupFullstack(config, root, framework)
{
   const frontendPath = path.join(root, "frontend");
   const backendPath = path.join(root, "backend");

   await fs.ensureDir(frontendPath);
   await fs.ensureDir(backendPath);

   await copyTemplate(`frontend/${config.frontendFramework}`, frontendPath);
   await copyTemplate("backend", backendPath);

   if (config.auth) await setupAuth(backendPath);

   if (!config.prisma) await setupPrisma(backendPath);

   if(config.swagger) await applySwagger(backendPath, config.install);

   await createEnv(backendPath, config);

   if (config.eslint) 
      await setupESLint([frontendPath, backendPath]);

   if (config.prettier) 
      await setupPrettier([frontendPath, backendPath]);

   await ensurePackageJson(frontendPath)

   await updatePackageScripts(
      [frontendPath, backendPath],
      config.eslint,
      config.prettier
   );

   if (config.tailwind) await setupTailwind(frontendPath, config.frontendFramework);
   
   if (config.install) {
      await installCodeQualityPackages(
         [frontendPath, backendPath],
         config.eslint,
         config.prettier
      );

      await installDependencies([frontendPath, backendPath]);
      
      await installDatabasePackages(
         backendPath,
         config.database,
         config.prisma
      );
   }

}

async function ensurePackageJson(projectPath) {
   const packagePath = path.join(
      projectPath,
      "package.json"
   );

   const fileExist = await fs.pathExists(packagePath) 

   if (!fileExist) {
      await fs.writeJson(
         packagePath,
         {
            name: path.basename(projectPath),
            version: "1.0.0",
            scripts: {},
         },
         { spaces: 2 }
      );
   }
}

module.exports = {setupFrontend, setupBackend, setupFullstack}