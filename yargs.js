const yargs = require("yargs").argv;
const chalk = require("chalk");

let bgColor1 =
  "bg" + yargs.bgColor[0].toUpperCase() + yargs.bgColor.slice(1).toLowerCase();

console.log(chalk[yargs.color][bgColor1](yargs.text));