const { execa } = require("execa");
const ora = require("ora").default;

async function installDependencies(projectPaths) {

   const spinner = ora("Installing dependencies...").start();
   
   try {
      await Promise.all(
         projectPaths.map(p =>
            execa("npm", ["install"], {
               cwd: p,
               stdio: "ignore",
            })
         )
      );

      spinner.succeed("Dependencies installed successfully!");

   } catch (err) {
      spinner.fail("Failed to install dependencies.");
      throw err;
   }
}

module.exports = installDependencies;