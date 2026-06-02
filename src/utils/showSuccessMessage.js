const chalk = require("chalk").default;

function showSuccessMessage(projectName, config) {
   console.log(chalk.green.bold("✔ Project created successfully!"));

   console.log();

   console.log(chalk.cyan("Next steps:"));

   if (config.type === "frontend") {
      console.log(chalk.white(`  cd ${projectName}`));

      if (!config.install) {
         console.log(chalk.white("  npm install"));
      }

      console.log(chalk.white("  npm run dev"));
   }

   if (config.type === "backend") {
      console.log(chalk.white(`  cd ${projectName}`));

      if (!config.install) {
         console.log(chalk.white("  npm install"));
      }

      console.log(chalk.white("  npm start"))
   }

   if (config.type === "fullstack") {
      console.log(chalk.white(`  cd ${projectName}`));

      console.log();

      console.log(chalk.yellow("Frontend:"));

      console.log(chalk.white("  cd frontend"));

      if (!config.install) {
         console.log(chalk.white("  npm install"));
      }

      console.log(chalk.white("  npm run dev"));

      console.log();

      console.log(chalk.yellow("Backend:"));

      console.log(chalk.white("  cd ../backend")
      );

      if (!config.install) {
         console.log(chalk.white("  npm install"));
      }

      console.log(chalk.white("  npm start"));
   }

   console.log();
}

module.exports = showSuccessMessage;