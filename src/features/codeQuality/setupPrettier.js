const fs = require("fs-extra");
const path = require("path");

async function setupPrettier(projectPaths) {
   const config = {
      semi: true,
      singleQuote: true,
      trailingComma: "es5",
   };

   await Promise.all(
      projectPaths.map(p =>
         fs.writeJson(
            path.join(p, ".prettierrc"),
            config,
            { spaces: 2 }
         )
      )
   );
}

module.exports = setupPrettier;