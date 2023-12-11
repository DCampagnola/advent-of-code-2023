const { maxStepsFromStart } = require("./solution");

const input = require("fs").readFileSync("day-10/input.txt", "utf-8");

console.log(maxStepsFromStart(input));