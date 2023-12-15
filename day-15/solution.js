
function calculateInitializationSequenceHash(string) {
    const sequences = string.split(",");
    let sum = 0;
    for (const sequence of sequences) {
        sum += hashString(sequence);
    }
    return sum;
}

function hashString(string) {
    let sum = 0;
    for (const char of string) {
        sum += getASCII(char);
        sum *= 17;
        sum %= 256;
    }
    return sum;
}

function getASCII(char) {
    return char.charCodeAt(0)
}

function calculateFocusingPower(string) {
    const sequences = string.split(",");
    const map = initMap();
    for (const sequence of sequences) {
        const operator = sequence.includes(Operator.EQUAL) ? Operator.EQUAL : Operator.MINUS;
        const [label, focalLength] = sequence.split(/[=-]/);
        const hash = hashString(label);
        let index = 0;
        while (index < map[hash].length && map[hash][index].label != label) {
            index++;
        }
        if (operator == Operator.EQUAL) {
            if (index < map[hash].length) {
                map[hash][index].focalLength = focalLength;
            } else {
                map[hash].push({
                    label,
                    focalLength: +focalLength
                });
            }
        } else if (map[hash].length > 0) {
            if (index < map[hash].length) {
                map[hash].splice(index, 1);
            }
        }
    }
    let result = 0;
    for (let i = 0; i < 256; i++) {
        const box = i + 1;
        if (map[i].length > 0) {
            let slot = 1;
            for (const { focalLength } of map[i]) {
                result += box * slot * focalLength;
                slot++;
            }
        }
    }
    return result;
}

function initMap() {
    const map = {};
    for (let i = 0; i < 256; i++) {
        map[i] = [];
    }
    return map;
}

const Operator = {
    EQUAL: "=",
    MINUS: "-"
}

module.exports = {
    hashString,
    calculateInitializationSequenceHash,
    calculateFocusingPower
};