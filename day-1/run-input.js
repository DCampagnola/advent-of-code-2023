const fs = require('fs');
const { mainPart1, mainPart2 } = require('./solution');
const input = fs.readFileSync('day-1/input.txt', 'utf-8');

console.log(mainPart1(input.split("\n")));
console.log(mainPart2(input.split("\n")));