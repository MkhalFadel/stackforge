const fs = require("fs-extra");
const path = require("path");

async function createEnv(projectPath, database) {

   let databaseUrl = "";

   if (database === "postgresql") {

      databaseUrl =
         'DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/mydb"';
   }

   else if (database === "mysql") {

      databaseUrl =
         'DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/mydb"';
   }

   const envContent = `
PORT=5000
${databaseUrl}
`;

   await fs.writeFile(
      path.join(projectPath, ".env"),
      envContent
   );
}

module.exports = createEnv;