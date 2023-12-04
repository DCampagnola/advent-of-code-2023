
function sumPartNumberOfEngine(engine) {
    const numbers = getNumbersOfEngine(engine);
    const symbols = getSymbolsOfEngine(engine);
    return numbers
        .filter((n) => isNumberPartOfEngine(n, symbols))
        .reduce((acc, n) => n.number + acc, 0)
}

function getNumbersOfEngine(engine) {
    let currentNumber = 0;
    let currentStartIndex = null;
    const result = [];
    for (const line in engine.split("\n")) {
        const lineString = engine.split("\n")[line];
        for (const i in lineString) {
            const char = lineString[i];
            const isNumber = /\d/.test(char)
            if (isNumber) {
                currentNumber = currentNumber * 10 + +char;
                if (!currentStartIndex) currentStartIndex = i;
            } else if (currentStartIndex != null) {
                result.push({
                    number: currentNumber,
                    line: +line,
                    from: +currentStartIndex,
                    to: i - 1
                });
                currentStartIndex = null;
                currentNumber = 0;
            }
        }
        if (currentStartIndex != null) {
            result.push({
                number: currentNumber,
                line: +line,
                from: +currentStartIndex,
                to: lineString.length - 1
            });
            currentStartIndex = null;
            currentNumber = 0;
        }
    }
    return result;
}

function getSymbolsOfEngine(engine) {
    const result = {};
    const engineLines = engine.split("\n");
    for (let i = 0; i < engineLines.length; i++) {
        for (let j = 0; j < engineLines[i].length; j++) {
            const char = engineLines[i][j];
            const isNumber = /\d/.test(char);
            const isDot = char === '.';
            if (!isNumber && !isDot) {
                result[[i, j]] = true;
            }
        }
    }
    return result;
}

function isNumberPartOfEngine(number, symbolsOfEngine) {
    const boundTop = number.line - 1;
    const boundBottom = number.line + 1;
    const symbolRight = symbolsOfEngine[[number.line, number.to + 1]];
    const symbolLeft = symbolsOfEngine[[number.line, number.from - 1]];
    if (symbolLeft || symbolRight) return true;
    for (let i = number.from - 1; i <= number.to + 1; i++) {
        if (symbolsOfEngine[[boundTop, i]]) return true;
        if (symbolsOfEngine[[boundBottom, i]]) return true;
    }
    return false;
}

function sumGearRatiosForEngine(engine) {
    const gears = getGearsForEngine(engine);
    const partNumbers = getPartNumbersForEngine(engine);
    const partNumbersMatrix = getPartNumberMatrix(partNumbers);
    return gears
        .map((g) => getGearRatio(g, partNumbersMatrix,partNumbers))
        .reduce(
            (acc, val) => acc+val,
            0
        )
}

function getPartNumbersForEngine(engine) {
    const numbers = getNumbersOfEngine(engine);
    const symbols = getSymbolsOfEngine(engine);
    return numbers
        .filter((n) => isNumberPartOfEngine(n, symbols))
}

function getPartNumberMatrix(partNumbers) {
    return partNumbers.reduce(
        (acc, {from, to, line}, index) => {
            const toAdd = {};
            for(from; from <=to; from++) {
                toAdd[[line, from]] = index;
            }
            return {
                ...toAdd,
                ...acc
            };
        },
        {}
    );
}

function getGearRatio(gear, partNumbersMatrix, partNumbers) {
    const [gearX, gearY] = gear;
    const upperBound = gearX - 1;
    const lowerBound = gearX + 1;
    let partNumbersCount = 0;
    let foundPartNumbers = {};
    let partNumbersRatio = 1;

    const leftNumber = partNumbersMatrix[[gearX, gearY - 1]];
    if(leftNumber != null && !foundPartNumbers[leftNumber]) {
        partNumbersCount++;
        foundPartNumbers[leftNumber] = true;
        partNumbersRatio*=partNumbers[leftNumber].number;
    }
    const rightNumber = partNumbersMatrix[[gearX, gearY + 1]];
    if(rightNumber != null && !foundPartNumbers[rightNumber]) {
        partNumbersCount++;
        foundPartNumbers[rightNumber] = true;
        partNumbersRatio*=partNumbers[rightNumber].number;
    }
    for(let i = gearY-1; i<=gearY+1; i++) {
        const upperNumber = partNumbersMatrix[[upperBound, i]];
        if(upperNumber != null && !foundPartNumbers[upperNumber]) {
            partNumbersCount++;
            foundPartNumbers[upperNumber] = true;
            partNumbersRatio*=partNumbers[upperNumber].number;
        }
        const lowerNumber = partNumbersMatrix[[lowerBound, i]];
        if (lowerNumber != null && !foundPartNumbers[lowerNumber]) {
            partNumbersCount++;
            foundPartNumbers[lowerNumber] = true;
            partNumbersRatio*=partNumbers[lowerNumber].number;
        }
    }
    if (partNumbersCount == 2) {
        return partNumbersRatio;
    }
    return null;
}

function getGearsForEngine(engine) {
    const result = [];
    const engineLines = engine.split("\n");
    for (let i = 0; i < engineLines.length; i++) {
        for (let j = 0; j < engineLines[i].length; j++) {
            const char = engineLines[i][j];
            const isGear = char === '*';
            if (isGear) {
                result.push([i, j]);
            }
        }
    }
    return result;
}

module.exports = {
    sumPartNumberOfEngine,
    getNumbersOfEngine,
    getSymbolsOfEngine,
    isNumberPartOfEngine,
    sumGearRatiosForEngine,
    getGearsForEngine,
    getPartNumberMatrix,
    getGearRatio
};