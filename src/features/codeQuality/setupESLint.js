const fs = require("fs-extra");
const path = require("path");

async function setupESLint(projectPath) {
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

   await fs.writeJson(
      path.join(projectPath, ".eslintrc.json"),
      config,
      { spaces: 2 }
   );
}

module.exports = setupESLint;