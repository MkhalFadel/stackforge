#!/usr/bin/env node

const { Command } = require("commander");
const logger = require("../src/utils/logger");
const createStructure = require("../src/utils/createStructure");
const askProjectType = require("../src/utils/prompts");

const program = new Command();

program
   .name("stackforge")
   .description("Fullstack project generator")
   .version("1.0.0");

program
   .argument("<project-name>")
   .action(async (projectName) => {

      // Ask the user for project type
      const projectType = await askProjectType();

      logger.info(
         `Creating ${projectType} project: ${projectName} ⏳`
      );

      // Pass project type into structure creator
      await createStructure(projectName, projectType);

      logger.success(
         `${projectName} is ready! 🚀`
      );
   });

program.parse();