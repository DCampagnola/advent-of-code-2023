
function tiltNord(string) {
    const map = string.split("\n").map((s) => s.split(""));
    for (let col = 0; col < map[0].length; col++) {
        let firstAvailableIndex = 0;
        let availableSpots = 0;
        for (let row = 0; row < map.length; row++) {
            if (map[row][col] === Symbols.CUBE_ROCK) {
                firstAvailableIndex = row + 1;
                availableSpots = 0;
            } else if (map[row][col] === Symbols.ROUNDED_ROCK) {
                if (availableSpots > 0) {
                    map[firstAvailableIndex][col] = Symbols.ROUNDED_ROCK;
                    map[row][col] = Symbols.EMPTY_SPOT;
                    availableSpots--;
                    firstAvailableIndex++;
                } else {
                    firstAvailableIndex = row + 1;
                }
            } else {
                availableSpots++;
            }
        }
    }
    return map.map((a) => a.join("")).join("\n");
}

const Symbols = {
    ROUNDED_ROCK: 'O',
    CUBE_ROCK: '#',
    EMPTY_SPOT: '.'
};

function calculateLoad(string) {
    const rows = string.split("\n");
    let load = 0;
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        let tmpSum = 0;
        for (const char of row) {
            if (char == Symbols.ROUNDED_ROCK)
                tmpSum++;
        }
        load += tmpSum * (rows.length - i);
    }
    return load;
}

function calculateLoadAfterTilt(string) {
    return calculateLoad(tiltNord(string));
}

module.exports = {
    tiltNord,
    calculateLoad,
    calculateLoadAfterTilt
}