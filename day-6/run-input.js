const { getProductRecordBeat, getRecordBeatWithoutKerning } = require("./solution");

const input = require("fs").readFileSync("day-6/input.txt", "utf-8");

console.log(getProductRecordBeat(input));
console.log(getRecordBeatWithoutKerning(input))