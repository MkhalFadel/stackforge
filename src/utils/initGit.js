const { execa } = require("execa");
const ora = require("ora").default;

async function initGit(projectPath) {

   const spinner = ora("Initializing Git repository...").start();

   try {
      await execa("git", ["init"], {cwd: projectPath,});

      spinner.succeed("Git repository initialized!");

   } catch (err) {

      spinner.fail("Failed to initialize Git.");

      throw err;
   }
}

module.exports = initGit;