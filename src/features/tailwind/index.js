const { execa } = require("execa");
const ora = require("ora").default;

const fs = require("fs-extra");
const path = require("path");

async function setupTailwind(projectPath, framework)
{
   const spinner = ora(
      "Setting up Tailwind CSS..."
   ).start();

   try {

      await execa(
         "npm",
         [
            "install",
            "-D",
            "tailwindcss",
            "@tailwindcss/vite"
         ],
         {
            cwd: projectPath,
            stdio: "ignore",
         }
      );

      if (framework === "react") {
         await setupReactTailwind(
            projectPath
         );
      }

      if (framework === "next") {
         await setupNextTailwind(
            projectPath
         );
      }

      spinner.succeed(
         "Tailwind CSS configured!"
      );

   } catch (err) {
      spinner.fail(
         "Failed to setup Tailwind CSS."
      );

      throw err;
   }
}

async function setupReactTailwind(projectPath) 
{
   const viteConfigPath = path.join(
      projectPath,
      "vite.config.js"
   );

   let viteConfig = await fs.readFile(
                     viteConfigPath,
                     "utf-8"
                  );

   viteConfig = viteConfig.replace(
      "plugins: [react()]",
      `plugins: [react(), tailwindcss()]`
   );

   viteConfig =
      `import tailwindcss from '@tailwindcss/vite'\n`
      + viteConfig;

   await fs.writeFile(
      viteConfigPath,
      viteConfig
   );

   const cssPath = path.join(
      projectPath,
      "src",
      "index.css"
   );

   await fs.writeFile(
      cssPath,
      '@import "tailwindcss";'
   );
}

async function setupNextTailwind(projectPath) 
{
   let cssPath = path.join(
      projectPath,
      "app",
      "globals.css"
   );

   const hasSrcApp = await fs.pathExists(
      path.join(
         projectPath,
         "src",
         "app",
         "globals.css"
      )
   );

   if (hasSrcApp) {
      cssPath = path.join(
         projectPath,
         "src",
         "app",
         "globals.css"
      );
   }

   let cssContent = await fs.readFile(cssPath, "utf-8");

   cssContent = '@import "tailwindcss";\n' + cssContent;

   await fs.writeFile(cssPath, cssContent);
}

module.exports = setupTailwind;