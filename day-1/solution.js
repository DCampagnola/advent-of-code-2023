const fs = require('fs');
const input = fs.readFileSync('day-1/input.txt', 'utf-8').split('\n');
function mainPart2(input) {
    let result = 0;
    const lines = input.map(convertToDigits);
    for (let line of lines) {
        const firstDigit = getFirstNumber(line);
        const lastDigit = getLastNumber(line);
        const number = firstDigit * 10 + lastDigit;
        result += number;
    }
    return result;
}

function mainPart1(input) {
    let result = 0;
    
    for (let line of input) {
        const firstDigit = getFirstNumber(line);
        const lastDigit = getLastNumber(line);
        const number = firstDigit * 10 + lastDigit;
        result += number;
    }
    return result;
}

function convertToDigits(string) {
    const map = [
        ['one', '1'],
        ['two', '2'],
        ['three', '3'],
        ['four', '4'],
        ['five', '5'],
        ['six', '6'],
        ['seven', '7'],
        ['eight', '8'],
        ['nine', '9']
    ];
    const trie = toTrie(map);
    let str = '';
    for(let i in string) {
        let currentDict = trie;
        let found = false;
        for(let j = i; j < string.length; j++) {
            if (!currentDict[string[j]]) break;
            if (typeof currentDict[string[j]] == 'string') {
                str+=currentDict[string[j]];
                found = true;
            } else {
                currentDict = currentDict[string[j]];
            }
        }
        if (!found) str+= string[i];
    }
    return str;    
}

function toTrie(map) {
    const result = {};
    for(let [spelledDigit, digit] of map) {
        let currentDict = result;
        for(let char of spelledDigit.substring(0, spelledDigit.length - 1)) {
            if (!currentDict[char]) {
                currentDict[char] = {

                }
            }
            currentDict = currentDict[char];
        }
        currentDict[spelledDigit[spelledDigit.length - 1]] = digit;
    }
    return result;
}

function getFirstNumber(string) {
    for (let char of string) {
        if (Number.isInteger(parseInt(char))) {
            return parseInt(char);
        }
    }
    return 0;
}

function getLastNumber(string) {
    let lastNumber = 0;
    for (let char of string) {
        if (Number.isInteger(parseInt(char))) {
            lastNumber = parseInt(char);
        }
    }
    return lastNumber;
}

module.exports = {
    mainPart1,
    mainPart2,
    toTrie,
    getFirstNumber,
    getLastNumber,
}