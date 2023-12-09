const { getStepsToZZZ, getSimulaneouslyToEndingZ } = require("./solution");

const input = require("fs").readFileSync("day-8/input.txt", "utf-8");

console.log(getStepsToZZZ(input));
console.log(getSimulaneouslyToEndingZ(input))