const { installSwagger } = require('./installSwagger');
const { setupSwagger, modifyServer } = require("./setupSwagger");

async function applySwagger(projectPath, install)
{
   try {
      if(install)
      {
         await installSwagger(projectPath);
         await setupSwagger(projectPath)
         await modifyServer(projectPath)
      }
      
   } catch (error) {
      throw error;
   }
}

module.exports = applySwagger;

