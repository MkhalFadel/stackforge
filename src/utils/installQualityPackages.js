const { execa } = require("execa");

async function installCodeQualityPackages(projectPaths, eslint, prettier) 
{
   const packages = [];

   if (eslint) packages.push("eslint");

   if (prettier) packages.push("prettier");

   if (packages.length === 0) return;

   await Promise.all(
      projectPaths.map(p =>
         execa(
            "npm",
            ["install", "-D", ...packages],
            {
               cwd: p,
               stdio: "ignore",
            }
         )
      )
   );

}

module.exports = installCodeQualityPackages;