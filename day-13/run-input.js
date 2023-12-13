const { summarizeReflections } = require("./solution");

const input = require("fs").readFileSync("day-13/input.txt", "utf-8");

console.log(summarizeReflections(input));
console.log(summarizeReflections(input, true));