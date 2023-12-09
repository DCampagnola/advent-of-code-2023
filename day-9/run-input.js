const { sumExtrapolatedValues, sumBackwardsExtrapolatedValues } = require("./solution");

const input = require("fs").readFileSync("day-9/input.txt", "utf-8");

console.log(sumExtrapolatedValues(input));
console.log(sumBackwardsExtrapolatedValues(input));