const path = require("path");
const fs = require("fs-extra");
const { execa } = require("execa");

async function setupAuth(backendPath) 
{
   const authTemplatePath = path.join(
         __dirname,
         "../../templates/features/auth"
      );

   await fs.copy(
      authTemplatePath,
      backendPath
   );

   await execa(
      "npm",
      [
         "install",
         "jsonwebtoken",
         "bcryptjs"
      ],
      {
         cwd: backendPath,
         stdio: "ignore",
      }
   );
}

module.exports = setupAuth;