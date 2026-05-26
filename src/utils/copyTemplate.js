const fs = require("fs-extra");
const path = require("path");

async function copyTemplate(templateName, destination) {

   const templatePath = path.join(
      __dirname,
      "..",
      "templates",
      templateName
   );

   await fs.copy(templatePath, destination);
}

module.exports = copyTemplate;