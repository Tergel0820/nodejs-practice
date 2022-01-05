let _ = require("lodash");

let array = [undefined, "cat", false, 434, "", 32.0, true];

let func = _.without(array, undefined, false, true, "");

console.log(func);