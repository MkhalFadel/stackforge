const fs = require("fs-extra");
const path = require("path");
const ora = require("ora").default;

async function copyTemplate(templateName, destination) {

   const templatePath = path.join(
      __dirname,
      "..",
      "templates",
      templateName
   );

   const spinner = ora(`Copying ${templateName} template...`).start();

   try {
      await fs.copy(templatePath, destination);
      spinner.succeed(`Copied ${templateName} template`);
   } catch (error) {
      spinner.fail(`Failed to copy ${templateName} template`);
      throw error;
   }
}

module.exports = copyTemplate;