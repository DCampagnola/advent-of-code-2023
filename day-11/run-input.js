const { sumGalaxiesShortestPath } = require("./solution");

const input = require("fs").readFileSync("day-11/input.txt", "utf-8");

console.log(sumGalaxiesShortestPath(input));
console.log(sumGalaxiesShortestPath(input, Math.pow(10, 6)));