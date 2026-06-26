const fs = require("fs-extra");
const path = require("path");

async function createCompose(projectPath)
{
   const fileContent = `services:
  backend:
    build: .
    ports:
      - "5000:5000"
    env_file:
      - .env
   `;

   await fs.writeFile(path.join(projectPath, 'docker-compose.yml'), fileContent, "utf-8");
}

module.exports = createCompose;