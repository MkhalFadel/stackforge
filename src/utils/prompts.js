const select = require("@inquirer/select").default;
const chalk = require("chalk").default;
const logger = require("./logger");

async function askProjectType() {

   logger.title("StackForge");

   const answer = await select({
      message: chalk.magenta("Select project type:"),
      choices: [
         {
            name: "Frontend",
            value: "frontend",
         },
         {
            name: "Backend",
            value: "backend",
         },
         {
            name: "Fullstack",
            value: "fullstack",
         },
      ],
   });

   return answer;
}

module.exports = askProjectType;