const { execa } = require("execa");
const ora = require("ora").default;

async function installSwagger(projectPath)
{
   const spinner = ora("Installing Swagger packages...").start();

   const packages = ["swagger-jsdoc", "swagger-ui-express"];

   try {
      await execa('npm', ['install', ...packages], {
         cwd: projectPath, stdio: "ignore"
      });

      spinner.succeed("Swagger packages installed!");
   } catch (error) {
      spinner.fail("Failed to install Swagger packages");
      throw error;
   }
}

module.exports = {installSwagger};