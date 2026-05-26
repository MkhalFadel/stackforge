const fs = require("fs-extra");
const path = require("path");

async function removePrisma(projectPath) {

   await fs.remove(
      path.join(projectPath, "prisma")
   );
}

module.exports = removePrisma;