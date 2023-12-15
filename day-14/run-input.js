const { calculateLoadAfterTilt, tiltNord } = require("./solution");

const input = require("fs").readFileSync("day-14/input.txt", "utf-8");

console.log(calculateLoadAfterTilt(input));
console.log(tiltNord(input));
