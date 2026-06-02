const fs = require("fs-extra");
const path = require("path");

async function setupESLint(projectPaths) {
   const config = {
      env: {
         node: true,
         es2021: true,
      },
      extends: ["eslint:recommended"],
      parserOptions: {
         ecmaVersion: "latest",
      },
      rules: {},
   };

   await Promise.all(
      projectPaths.map(p =>
         fs.writeJson(
            path.join(p, ".eslintrc.json"),
            config,
            { spaces: 2 }
         )
      )
   );
}

module.exports = setupESLint;