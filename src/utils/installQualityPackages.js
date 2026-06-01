const { execa } = require("execa");

async function installCodeQualityPackages(projectPath, eslint, prettier) 
{
   const packages = [];

   if (eslint) packages.push("eslint");

   if (prettier) packages.push("prettier");

   if (packages.length === 0) return;

   await execa(
      "npm",
      ["install", "-D", ...packages],
      {
         cwd: projectPath,
         stdio: "inherit",
      }
   );
}

module.exports = installCodeQualityPackages;