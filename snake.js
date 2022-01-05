const readline = require("readline");
const chalk = require("chalk");

if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

readline.emitKeypressEvents(process.stdin);
process.stdin.on("keypress", (key) => {
  if (key == "w" && gameState.dir != "D") {
    gameState.dir = "U";
  } else if (key == "a" && gameState.dir != "R") {
    gameState.dir = "L";
  } else if (key == "s" && gameState.dir != "U") {
    gameState.dir = "D";
  } else if (key == "d" && gameState.dir != "L") {
    gameState.dir = "R";
  }
});

const row = (c) => (n) => c.repeat(n);
const col = (row) => (n) => (row + "\n").repeat(n);
const newLine = () => "\033c";
const rnd = (min) => (max) => Math.round(Math.random() * (max - min));

let gameState = {
  dir: "R",
  snake: [
    [7, 7],
    [7, 6],
    [7, 5],
  ],
  appleRow: rnd(0)(30),
  appleCol: rnd(0)(15),
};

const nextApple = (state) => {
  const check = (state) => {
    state.snake.forEach((coord) => {
      if (coord[0] == state.appleRow && coord[1] == state.appleCol)
        return false;
    });
    return true;
  };
  state.appleRow = rnd(0)(14);
  state.appleCol = rnd(0)(29);

  while (check(state) == false) {
    state.appleRow = rnd(0)(14);
    state.appleCol = rnd(0)(29);
  }
  return state;
};

const addApple = (state) => (board) => {
  return board.map((r, i) => {
    return i != state.appleRow
      ? r
      : r.map((v, j) => {
          return j == state.appleCol ? chalk.red("") : v;
        });
  });
};

const eatApple = (state) => {
  if (
    state.appleRow == state.snake[0][0] &&
    state.appleCol == state.snake[0][1]
  )
    state = nextApple(state);
  else state.snake.pop();
  return state;
};

const addSnake = (state) => (board) => {
  return board.map((r, i) => {
    return r.map((v, j) => {
      let flag = false;
      state.snake.forEach((coord) => {
        if (coord[0] == i && coord[1] == j) {
          flag = true;
        }
      });
      return flag ? chalk.green("█") : v;
    });
  });
};

const moveSnake = (state) => {
  if (state.dir == "R")
    state.snake.unshift([state.snake[0][0], (30 + state.snake[0][1] + 1) % 30]);
  if (state.dir == "L")
    state.snake.unshift([state.snake[0][0], (30 + state.snake[0][1] - 1) % 30]);
  if (state.dir == "U")
    state.snake.unshift([(15 + state.snake[0][0] - 1) % 15, state.snake[0][1]]);
  if (state.dir == "D")
    state.snake.unshift([(15 + state.snake[0][0] + 1) % 15, state.snake[0][1]]);

  return state;
};

const gameOver = (state) => {
  if (
    state.snake.filter(
      (coord) => coord[0] == state.snake[0][0] && coord[1] == state.snake[0][1]
    ).length > 1
  ) {
    console.log(chalk.bgRed("GGWP"));
    process.exit();
  }
};

let board = col(row(".")(30))(15)
  .split("\n")
  .map((x) => x.split(""));

gameState = nextApple(gameState);
board = addApple(gameState)(board);

setInterval(() => {
  // COLOR
  const r = rnd(0)(255);
  const g = rnd(0)(255);
  const b = rnd(0)(255);

  // SNAKE TEXT
  let header = newLine();
  header += chalk.rgb(r, g, b)(row(" ")(12) + "SNAKE" + row(" ")(12));
  console.log(header);
  let board = col(row(".")(30))(15)
    .split("\n")
    .map((x) => x.split(""));

  state = moveSnake(gameState);
  state = eatApple(gameState);

  board = addApple(gameState)(board);
  board = addSnake(gameState)(board);
  console.log(chalk.gray(board.map((line) => line.join("")).join("\n")));
  gameOver(gameState);
}, 100);