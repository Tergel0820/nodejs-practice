const chalk = require("chalk");

let args = process.argv.slice(2);
let str = args.join("");
let color = "white",
  bgColor = "bgBlack",
  text = "Hello World!";

if (str.includes("-bg")) {
  let temp = str.split("-bg")[1].split("-")[0];
  bgColor = "bg" + temp[0].toUpperCase() + temp.slice(1).toLowerCase();
}
if (str.includes("-c")) {
  color = str.split("-c")[1].split("-")[0];
}
if (str.includes("-t")) {
  text = str.split("-t")[1].split("-")[0];
}

console.log(chalk[color][bgColor](text));