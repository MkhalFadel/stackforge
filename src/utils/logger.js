const chalk = require("chalk").default;
const figlet = require("figlet");

function title(message) {

   const data = figlet.textSync(message, {
      font: 'ANSI Shadow',
      horizontalLayout: "default",
      verticalLayout: "default",
   });

   console.log(
      chalk.cyan(data)
   );
}

function success(message) {
   console.log(
      chalk.green(`✔ ${message}`)
   );
}

function error(message) {
   console.log(
      chalk.red(`✖ ${message}`)
   );
}

function info(message) {
   console.log(
      chalk.blue(message)
   );
}

module.exports = {
   title,
   success,
   error,
   info,
};