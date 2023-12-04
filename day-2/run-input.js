const { sumPossibleGamesId, getPowerOfFewestCubes } = require('./solution');

const input = require('fs').readFileSync('day-2/input.txt', 'utf-8').split("\n");

console.log(sumPossibleGamesId(input));
console.log(getPowerOfFewestCubes(input));