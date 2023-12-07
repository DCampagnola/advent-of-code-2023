const { calculateTotalWinning, calculateTotalWinningWithJokerRule } = require("./solution");

const input = require("fs").readFileSync("day-7/input.txt", "utf-8");

console.log(calculateTotalWinning(input));
console.log(calculateTotalWinningWithJokerRule(input));