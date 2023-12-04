const { sumScoreForScratchCards, getTotalCardWithCopiedCards } = require("./solution");

const input = require("fs").readFileSync('day-4/input.txt', 'utf-8');

console.log(sumScoreForScratchCards(input));
console.log(getTotalCardWithCopiedCards(input));