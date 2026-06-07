const fs = require("fs-extra");
const path = require("path");

async function setupSwagger(projectPath)
{
   const content = `
const path = require("path");
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
   definition: {
      openapi: '3.0.0',
      info: {title: 'API Docs', version: '1.0.0'}
   },
   apis: [path.join(__dirname, "..", "**/*.js")]
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec; 
   `;

   const configDir = path.join(projectPath, 'src', 'config')
   await fs.ensureDir(configDir);
   await fs.writeFile(path.join(configDir, "swagger.js"), content, "utf-8");
}

async function modifyServer(projectPath)
{
   const filePath = path.join(projectPath, 'src', 'server.js');

   try {
      let content = await fs.readFile(filePath, 'utf8');
      
      content = content.replace("// STACKFORGE_IMPORTS", `
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

// STACKFORGE_IMPORTS
      `)
      
      content = content.replace("// STACKFORGE_MIDDLEWARE", `
app.use(
   "/api-docs",
   swaggerUi.serve,
   swaggerUi.setup(swaggerSpec)
);

// STACKFORGE_MIDDLEWARE'

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns a message indicating the backend is running.
 *     responses:
 *       200:
 *         description: Backend is running successfully.
 */
      `)

      await fs.writeFile(filePath, content)

   } catch (error) {
      console.log("setup Error:", error)
   }
}

module.exports = {setupSwagger, modifyServer}