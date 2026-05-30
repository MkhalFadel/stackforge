#!/usr/bin/env node

const { Command } = require("commander");
const logger = require("../src/utils/logger");
const createStructure = require("../src/utils/createStructure");
const askProjectConfig = require("../src/utils/prompts");
const showSuccessMessage = require('../src/utils/showSuccessMessage')

const program = new Command();

program
   .name("stackforge")
   .description("Fullstack project generator")
   .version("1.0.0");

program
   .argument("<project-name>")
   .action(async (projectName) => {

      logger.title("StackForge");

      // Ask the user for project type
      const config = await askProjectConfig();

      logger.info(`Creating ${config.type} project: ${projectName} ⏳`);

      // Pass project type into structure creator
      await createStructure(projectName, config);

      showSuccessMessage(projectName, config)

      logger.success(
         `${projectName} is ready! 🚀`
      );
   });

program.parse();