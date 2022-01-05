let _ = require("lodash");

let array = [
  { id: "1abc", title: "First blog post", content: "..." },
  { id: "2abc", title: "Second blog post", content: "..." },
  { id: "34abc", title: "The blog post we want", content: "..." },
];

_.keyBy(array, function (o) {
  return String.fromCharCode(o);
});

console.log(_.keyBy(array, "id"));