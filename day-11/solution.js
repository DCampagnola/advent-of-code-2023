
function getDistance([y1, x1], [y2, x2]) {
    return Math.abs(x1-x2) + Math.abs(y1-y2);
}
function countInRange(arr, a, b) {
    let min = Math.min(a, b);
    let max = Math.max(a,b);
    return arr.filter((n) => n > min && n < max).reduce((acc, a) => acc+1, 0);
}
function sumGalaxiesShortestPath(universeString, emptyExpansion=2) {
    const universe = universeString.split("\n").map((s) => s.split(""));
    const {cols, rows} = getGravitationalRowsCols(universe);
    const galaxies = [];
    for (let i = 0; i<universe.length; i++) {
        for(let j = 0; j<universe[i].length; j++) {
            if(universe[i][j] == '#') {
                galaxies.push([i, j]);
            }
        }
    }
    let sum = 0;
    for (let i = 0; i<galaxies.length; i++) {
        for (let j = i + 1; j<galaxies.length; j++) {
            const [y1, x1] = galaxies[i];
            const [y2, x2] = galaxies[j];
            const countEmptyRows = countInRange(rows, y1, y2);
            const countEmptyCols = countInRange(cols, x1, x2);
            sum+=getDistance(galaxies[i], galaxies[j]);
            sum+=countEmptyCols * emptyExpansion - countEmptyCols;
            sum+=countEmptyRows * emptyExpansion - countEmptyRows;
        }
    }
    return sum;
}


function getGravitationalRowsCols(galaxy) {
    const emptyRows = [];
    const emptyCols = [];
    for(let i = 0; i<galaxy.length; i++) {
        let isEmpty = true;
        for(let j = 0; j<galaxy[i].length; j++) {
            if (galaxy[i][j] != ".") {
                isEmpty = false;
            }
        }
        if (isEmpty) {
            emptyRows.push(i);
        }
    }
    const lenA = galaxy.length, lenB = galaxy[0].length;
    for(let i = 0; i<lenB; i++) {
        let isEmpty = true;
        for(let j = 0; j<lenA; j++) {
            if (galaxy[j][i] != ".") {
                isEmpty = false;
            }
        }
        if (isEmpty) {
            emptyCols.push(i);
        }
    }
    return {
        rows: emptyRows,
        cols: emptyCols,
    };
}

module.exports = {
    getDistance,
    sumGalaxiesShortestPath,
    getGravitationalRowsCols
}