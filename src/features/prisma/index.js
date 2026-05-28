const fs = require("fs-extra");
const path = require("path");

async function setupPrisma(projectPath, enabled) 
{
   if (!enabled) await fs.remove(path.join(projectPath, "prisma"));
}

module.exports = setupPrisma;