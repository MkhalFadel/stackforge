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
      
   if (type !== 'backend') 
   {
      frontendFramework = await select({
         message: chalk.cyan("Select frontend framework:"),

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

   if (frontendFramework && frontendFramework !== 'vanilla') 
   {
      tailwind = await confirm({
         message: chalk.cyan("Include Tailwind CSS?"),
         default: true,
      });
   }

   let database = null;
   let prisma = false;
   let swagger = false;
   let auth = false;

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
      
      prisma = await confirm({
         message: chalk.cyan("Include Prisma ORM?"),
         default: true,
      });
   
      swagger = await confirm({
         message: chalk.cyan("Include Swagger/OpenAPI documentation?"),
         default: true
      })
      
      auth = await confirm({
         message: chalk.cyan("Include JWT Authentication?"),
         default: true,
      });
   }

   const git = await confirm({
      message: chalk.cyan("Initialize Git repository?"),
      default: true,
   });

   const eslint = await confirm({
      message: chalk.cyan("Include ESLint?"),
      default: true,
   });

   const prettier = await confirm({
      message: chalk.cyan("Include Prettier?"),
      default: true,
   });

   let docker = false;

   if(type !== 'frontend')
   {
      docker = await confirm({
         message: chalk.cyan("Include Docker support?"),
         default: true,
      })
   }

   let install = false;

   if(frontendFramework !== 'vanilla' || type !== 'frontend')
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
      swagger,
      git,
      auth,
      prettier,
      eslint,
      docker,
      install,
   };
}

module.exports = askProjectConfig;