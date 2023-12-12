const { sumPossileArrangments, sumPossileArrangmentsFolded } = require("./solution");

const input = require("fs").readFileSync("day-12/input.txt", "utf-8");

console.log(sumPossileArrangments(input));
console.log(sumPossileArrangmentsFolded(input));