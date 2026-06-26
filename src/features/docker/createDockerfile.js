const fs = require("fs-extra");
const path = require("path");

async function createDockerfile(projectPath)
{
   const fileContent = `
FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
`

   await fs.writeFile(path.join(projectPath, 'Dockerfile'), fileContent, "utf-8");
}

module.exports = createDockerfile;