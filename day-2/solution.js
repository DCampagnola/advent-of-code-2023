function parseGameString(string) {
    const [gameIdString, setsString] = string.split(":");
    const gameId = parseInt(gameIdString.substring(5));
    const setStrings = setsString.split(";");
    const sets = setStrings.map(
        getSet,
    )
    return [gameId, sets]
}

function getSet(setString) {
    return setString.split(",").reduce((acc, str) => {
        const [numString, colorString] = str.substring(1).split(" ");
        return {
            ...acc,
            [colorString]: parseInt(numString)
        }
    }, {});
}

function isGamePossible(sets) {
    for(const set of sets) {
        const maximumPossibleSet = {
            'red': 12,
            'green': 13,
            'blue': 14
        };
        for(const [color, cubes] of Object.entries(set)) {
            maximumPossibleSet[color] -= cubes;
        }
        const isSetPossible = Object.values(maximumPossibleSet).every((num) => num>=0);
        if(!isSetPossible) return false;
    }
    return true;
}

function sumPossibleGamesId(gameStrings) {
    const games = gameStrings.map(parseGameString);
    const result = games
        .filter(([gameId, set]) => isGamePossible(set))
        .map(([gameId, set]) => gameId)
        .reduce((acc, n) => acc+n, 0)
    return result;
}

function getFewestCubesForGame(set) {
    let maxRed = Math.max(...set.map(({red}) => red || 0));
    let maxGreen = Math.max(...set.map(({green}) => green || 0));
    let maxBlue = Math.max(...set.map(({blue}) => blue || 0));
    return {
        'red': maxRed,
        'green': maxGreen,
        'blue': maxBlue,
    };
}

function getPowerForSet(set) {
    return set.green * set.blue * set.red;
}

function getPowerOfFewestCubes(gamesStrings) {
    const games = gamesStrings.map(parseGameString);
    const fewestCubesGames = games.map(([gameId, set]) => set).map(getFewestCubesForGame);
    return fewestCubesGames.map(getPowerForSet).reduce((acc, n) => acc+n, 0);
}

module.exports = {
    parseGameString,
    isGamePossible,
    sumPossibleGamesId,
    getFewestCubesForGame,
    getPowerOfFewestCubes,
    getPowerForSet
}