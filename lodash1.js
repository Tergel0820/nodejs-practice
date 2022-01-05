let _ = require("lodash");

let array = [1, 2, 3, 1, 2, 4, 2, 3, 5, 3];

let func = _.uniq(array);

console.log(func);