
const assert = require("assert");

function isVerticalReflection(matrix, column, smudge=false) {
    assert(column > 0 && column < matrix[0].length);
    let up = column - 1;
    let down = column;
    let differencesCount = 0;
    while (up >= 0 && down < matrix[0].length) {
        for (let i = 0; i < matrix.length; i++) {
            if (matrix[i][up] != matrix[i][down]) {
                if (!smudge) return false;
                differencesCount++;
            }
        }
        up--;
        down++;
    }
    if (smudge) return differencesCount == 1;
    else return true;
}

function isHorizontalReflection(matrix, row, smudge=false) {
    assert(row > 0 && row < matrix.length);
    let left = row - 1;
    let right = row;
    let differencesCount = 0;
    while (left >= 0 && right < matrix.length) {
        for (let i = 0; i < matrix[row].length; i++) {
            if (matrix[left][i] != matrix[right][i]) {
                if (!smudge) return false;
                differencesCount++;
            }
        }
        left--;
        right++;
    }
    if (smudge) return differencesCount == 1;
    else return true;
}

function summarizeReflections(string, smudge=false) {
    const reflectionsStrings = string.split("\n\n");
    const reflections = reflectionsStrings.map(parseStringToReflection);
    let summary = 0;
    for (let i = 0; i < reflections.length; i++) {
        const reflection = reflections[i];
        for (let row = 1; row < reflection.length; row++) {
            if (isHorizontalReflection(reflection, row, smudge)) {
                summary += row * 100;
                break;
            }
        }
        for (let col = 1; col < reflection[0].length; col++) {
            if (isVerticalReflection(reflection, col, smudge)) {
                summary += col;
                break;
            }
        }
    }
    return summary;
}

function parseStringToReflection(string) {
    return string.split("\n").map((s) => s.split(""));
}

module.exports = {
    isVerticalReflection,
    isHorizontalReflection,
    summarizeReflections,
    parseStringToReflection,
}