const fs = require("fs-extra");
const path = require("path");

async function setupPrettier(projectPath) {
   const config = {
      semi: true,
      singleQuote: true,
      trailingComma: "es5",
   };

   await fs.writeJson(
      path.join(projectPath, ".prettierrc"),
      config,
      { spaces: 2 }
   );
}

module.exports = setupPrettier;