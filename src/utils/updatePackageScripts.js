const fs = require("fs-extra");
const path = require("path");

async function updatePackageScripts(projectPath, eslint, prettier) 
{
   await Promise.all(
      projectPath.map(async p => {
         const packagePath = path.join(
            p,
            "package.json"
         );
      
         const pkg = await fs.readJson(packagePath);
      
         pkg.scripts = pkg.scripts || {};
      
         if (eslint) pkg.scripts.lint = "eslint .";
      
         if (prettier) pkg.scripts.format = "prettier --write .";
      
         await fs.writeJson(
            packagePath,
            pkg,
            { spaces: 2 }
         );
      })
   );
}

module.exports = updatePackageScripts;