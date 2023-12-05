const { getLowestLocationFromSeeds, getLowestLocationFromRangeOfSeeds } = require('./solution');

const input = require('fs').readFileSync('day-5/input.txt', 'utf-8');

console.log(getLowestLocationFromSeeds(input));
console.log(getLowestLocationFromRangeOfSeeds(input));