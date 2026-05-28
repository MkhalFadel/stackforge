const { execa } = require("execa");
const ora = require("ora").default;

async function installTailwind(projectPath) {

   const spinner = ora("Installing Tailwind CSS...").start();

   try {
      await execa(
         "npm",
         [
            "install",
            "-D",
            "tailwindcss",
            "@tailwindcss/vite"
         ],
         {
            cwd: projectPath,
            stdio: "ignore",
         }
      );

      spinner.succeed("Tailwind CSS installed!");

   } catch (err) {

      spinner.fail("Failed to install Tailwind CSS.");

      throw err;
   }
}

module.exports = installTailwind;