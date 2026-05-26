const select = require("@inquirer/select").default;
const confirm = require("@inquirer/confirm").default;
const chalk = require("chalk").default;

async function askProjectConfig() {
   
   const type = await select({
      message: chalk.cyan("Select project type:"),
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

   let database = null;

   if (type !== "frontend") {

      database = await select({
         message: chalk.cyan("Select database:"),
         choices: [
            {
               name: "PostgreSQL",
               value: "postgresql",
            },
            {
               name: "MySQL",
               value: "mysql",
            },
         ],
      });
   }

   const prisma = await confirm({
      message: chalk.cyan("Include Prisma ORM?"),
      default: true,
   });

   const git = await confirm({
      message: chalk.cyan("Initialize Git repository?"),
      default: true,
   });

   const install = await confirm({
      message: chalk.cyan("Install dependencies automatically?"),
      default: true,
   });

   return {
      type,
      database,
      prisma,
      git,
      install,
   };
}

module.exports = askProjectConfig;