const fs = require("fs");

const checkWord = (w) => {
  let letters = /^[A-Za-z]+$/;
  if (w.match(letters)) return true;
  return false;
};

const findWordCount = (path) => {
  return new Promise((res, rej) => {
    fs.readFile(path, (err, data) => {
      let lines = data.toString().split("\n");

      let words = lines.reduce((acc, cur) => {
        let wordsPerLine = cur.split(" ");
        acc = wordsPerLine
          .filter(checkWord)
          .map((word) => word.toLowerCase())
          .reduce((wordCount, word) => {
            wordCount[word] =
              wordCount[word] == undefined ? 1 : wordCount[word] + 1;
            return wordCount;
          }, acc);
        return acc;
      }, {});
      res(words);
    });
  });
};

Promise.all([
  findWordCount("../asyncawait/smaller.txt"),
  findWordCount("../asyncawait/sgb-words.txt"),
  findWordCount("../asyncawait/shakespeare.txt"),
  findWordCount("../asyncawait/big.txt"),
]).then((allResponses) => {
  let result = allResponses.reduce((acc, cur) => {
    let keys = Object.keys(cur);
    acc = keys.reduce((w, w1) => {
      w[w1] = w[w1] == undefined ? cur[w1] : w[w1] + cur[w1];
      return w;
    }, acc);
    return acc;
  }, {});

  const tarr = Object.entries(result)
    .sort((a, b) => {
      return b[1] - a[1];
    })
    .slice(0, 10);

  console.log(tarr);
});