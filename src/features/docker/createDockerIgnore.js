const fs = require("fs-extra");
const path = require("path");

async function createDockerIgnore(projectPath)
{
   const fileContent = `node_modules
.git
.gitignore
.env
npm-debug.log
`;

   await fs.writeFile(path.join(projectPath, '.dockerignore'), fileContent, 'utf-8');
}

module.exports = createDockerIgnore;   