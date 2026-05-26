const { execa } = require("execa");
const ora = require("ora").default;

async function installDependencies(projectPath) {

   const spinner = ora(
      "Installing dependencies..."
   ).start();

   try {

      await execa("npm", ["install"], {
         cwd: projectPath,
         stdio: "ignore",
      });

      spinner.succeed(
         "Dependencies installed successfully!"
      );

   } catch (err) {

      spinner.fail(
         "Failed to install dependencies."
      );

      throw err;
   }
}

module.exports = installDependencies;