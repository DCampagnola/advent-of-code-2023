
const {sumPartNumberOfEngine, sumGearRatiosForEngine} = require('./solution');

const input = require("fs").readFileSync("day-3/input.txt", "utf-8");
console.log(sumPartNumberOfEngine(input));
console.log(sumGearRatiosForEngine(input))