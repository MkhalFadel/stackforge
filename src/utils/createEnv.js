const fs = require("fs-extra");
const path = require("path");

async function createEnv(projectPath, config) {

   let databaseUrl = "";

   let jwtSecret = "";

   if (config.auth) jwtSecret = "\nJWT_SECRET=supersecretkey";

   if (config.database === "postgresql")
      databaseUrl = 'DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/mydb"';

   else if (config.database === "mysql")
      databaseUrl = 'DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/mydb"';

   const envContent = `
   PORT=5000
   ${databaseUrl}
   ${jwtSecret}
   `;

   await fs.writeFile(path.join(projectPath, ".env"), envContent);
}

module.exports = createEnv;