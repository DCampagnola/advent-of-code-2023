
function cache(target) {
    const c = new Map();
    const getKey = (args) => args.map((a) => a.toString()).join("_");
    return (...args) => {
        const key = getKey(args);
        if (c.has(key)) {
            return c.get(key);
        }
        const result = target(...args);
        c.set(key, result);
        return result;
    }
}


function countArrangements(condition, damagedPattern, damagedRunning = false) {
    const rec = cache((condition, damagedPattern, damagedRunning = false) => {
        const pattern = [...damagedPattern];
        if (condition == "") {
            if (pattern.length == 0) {
                return 1;
            } else {
                return 0;
            }
        }
        const c = condition[0];
        if (isUnknown(c)) {
            return rec(Spring.OPERATIONAL + condition.substring(1), pattern, damagedRunning) +
            rec(Spring.DAMAGED + condition.substring(1), pattern, damagedRunning);
        } else {
            if (isDamaged(c)) {
                if (pattern.length == 0) return 0;
                const currentDamagedCount = pattern.shift() - 1;
                if (currentDamagedCount > 0) {
                    return rec(condition.substring(1), [currentDamagedCount, ...pattern], true);
                } else {
                    if (condition.length == 1 || isOperational(condition[1]) || isUnknown(condition[1])) {
                        return rec(condition.substring(2), pattern);
                    } else {
                        return 0;
                    }
                }
            } else if (isOperational(c)) {
                if (damagedRunning) return 0;
                return rec(condition.substring(1), pattern);
            }
        }
    });
    return rec(condition, damagedPattern, damagedRunning)
}

function sumPossileArrangments(conditionRecords) {
    const rows = conditionRecords.split("\n").map(parseRow);
    let sum = 0;
    for (const [condition, damagedPattern] of rows) {
        sum += countArrangements(condition, damagedPattern);
    }
    return sum;
}

function sumPossileArrangmentsFolded(conditionRecords) {
    const rows = conditionRecords.split("\n").map(parseRowFolded);
    let sum = 0;
    for (const [condition, damagedPattern] of rows) {
        sum += countArrangements(condition, damagedPattern);
    }
    return sum;
}

function parseRow(row) {
    const [
        condition,
        damagedPatternString
    ] = row.split(" ");
    return [
        condition,
        damagedPatternString.split(",").map(Number)
    ];
}

function parseRowFolded(row) {

    const [
        condition,
        damagedPatternString
    ] = row.split(" ");
    const conditions = new Array(5).fill(condition);
    const damagedPatternStrings = new Array(5).fill(damagedPatternString);
    return [
        conditions.join("?"),
        damagedPatternStrings.join(",").split(",").map(Number)
    ];
}
const Spring = {
    OPERATIONAL: '.',
    DAMAGED: '#',
    UNKNOWN: '?'
}

function isDamaged(c) {
    return c == Spring.DAMAGED;
}

function isOperational(c) {
    return c == Spring.OPERATIONAL;
}

function isUnknown(c) {
    return c == Spring.UNKNOWN;
}

module.exports = {
    countArrangements,
    sumPossileArrangments,
    sumPossileArrangmentsFolded
}