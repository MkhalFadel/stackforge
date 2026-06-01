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

   let frontendFramework = null;
      
   if (type === "frontend" || type === "fullstack") 
   {
      frontendFramework = await select({
         message: chalk.cyan(
            "Select frontend framework:"
         ),

         choices: [
            {
               name: "React",
               value: "react",
            },
            {
               name: "Next.js",
               value: "next",
            },
            {
               name: "Vanilla HTML/CSS/JS",
               value: "vanilla",
            },
         ],
      });
   }

   let tailwind = false;

   if (frontendFramework === "react" || frontendFramework === "next") 
   {
      tailwind = await confirm({
         message: chalk.cyan(
            "Include Tailwind CSS?"
         ),
         default: true,
      });
   }

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

   let prisma = false;

   if (type !== 'frontend') 
   {
      prisma = await confirm({
         message: chalk.cyan(
            "Include Prisma ORM?"
         ),
         default: true,
      });
   }

   const git = await confirm({
      message: chalk.cyan("Initialize Git repository?"),
      default: true,
   });

   let auth = false;

   if (type === "backend" || type === "fullstack") 
   {
      auth = await confirm({
         message: chalk.cyan(
            "Include JWT Authentication?"
         ),
         default: true,
      });
   }

   const eslint = await confirm({
      message: chalk.cyan("Include ESLint?"),
      default: true,
   });

   const prettier = await confirm({
      message: chalk.cyan("Include Prettier?"),
      default: true,
   });

   let install = false;

   if(frontendFramework !== 'vanilla' || type == 'backend' || type == 'fullstack')
   {
      install = await confirm({
         message: chalk.cyan("Install dependencies automatically?"),
         default: true,
      });
   }

   return {
      type,
      tailwind,
      frontendFramework,
      database,
      prisma,
      git,
      auth,
      prettier,
      eslint,
      install,
   };
}

module.exports = askProjectConfig;