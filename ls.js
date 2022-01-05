const fs = require("fs");
const yargs = require("yargs").argv;
const chalk = require("chalk");
const os = require("os");

if (yargs.l) {
  if (yargs.l != true) {
    fs.readdir(yargs.l, (readErr, files) => {
      if (readErr) {
        console.log(chalk.red(readErr));
        return;
      } else {
        files.forEach((file) => {
          fs.stat(`${yargs.l}/${file}`, (err, stats) => {
            if (err) {
              console.log(chalk.red(err));
              return;
            } else {
              console.log(
                stats.mode,
                " ",
                stats.nlink,
                " ",
                chalk.cyan(`${os.userInfo().username}   staff`),
                " ",
                chalk.red(stats.size),
                " ",
                chalk.magenta(stats.atime),
                " ",
                chalk.green(file)
              );
            }
          });
        });
      }
    });
  } else {
    fs.readdir(__dirname, (readErr, files) => {
      if (readErr) {
        console.log(chalk.red(readErr));
        return;
      } else {
        files.forEach((file) => {
          fs.stat(`${file}`, (err, stats) => {
            if (err) {
              console.log(chalk.red(err));
              return;
            } else {
              console.log(
                stats.mode,
                " ",
                stats.nlink,
                " ",
                chalk.cyan(`${os.userInfo().username}   staff`),
                " ",
                chalk.red(stats.size),
                " ",
                chalk.magenta(stats.atime),
                " ",
                chalk.green(file)
              );
            }
          });
        });
      }
    });
  }
} else {
  if (yargs._[0]) {
    fs.readdir(yargs._[0], (err, files) => {
      if (err) {
        console.log(chalk.red(err));
      } else {
        files.forEach((file) => {
          console.log(chalk.green(file));
        });
      }
    });
  } else {
    fs.readdir(__dirname, (err, files) => {
      if (err) {
        console.log(chalk.red(err));
      } else {
        files.forEach((file) => {
          console.log(chalk.green(file));
        });
      }
    });
  }
}