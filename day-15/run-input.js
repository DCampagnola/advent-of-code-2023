const { calculateInitializationSequenceHash, calculateFocusingPower } = require("./solution");

const input = require("fs").readFileSync("day-15/input.txt", "utf-8");

console.log(calculateInitializationSequenceHash(input));
console.log(calculateFocusingPower(input));