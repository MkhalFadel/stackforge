const ora = require("ora").default;

const createDockerfile = require('./createDockerfile')
const createDockerIgnore = require("./createDockerIgnore");
const createCompose = require('./createCompose');

async function setupDocker(projectPath)
{
   const spinner = ora('Setting up Docker...').start();

   try {
      
      await createDockerfile(projectPath);
      await createDockerIgnore(projectPath);
      await createCompose(projectPath);

      spinner.succeed("Docker setup Complete!");

   } catch (error) {
      spinner.fail("Docker setup Failed.");
      throw error;
   }
}

module.exports = setupDocker;