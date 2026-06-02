const { execa } = require("execa");
const ora = require("ora").default;

async function installDatabasePackages(projectPath, database, prisma)
{
   const spinner = ora("Installing database packages...").start();

   try {
      const packages = [];

      if (database === "postgresql")
         packages.push("pg");

      else if (database === "mysql")
         packages.push("mysql2");

      if (prisma) packages.push("@prisma/client");

      if (packages.length > 0) {
         await execa(
            "npm",
            ["install", ...packages],
            {
               cwd: projectPath,
               stdio: "ignore",
            }
         );
      }

      spinner.succeed("Database packages installed!");

   } catch (err) {
      spinner.fail("Failed to install database packages.");
      throw err;
   }
}

module.exports = installDatabasePackages;