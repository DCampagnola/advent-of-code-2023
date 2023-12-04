const { equal, deepEqual } = require("assert");
const { describe, test } = require("node:test");
const {parseGameString, isGamePossible, sumPossibleGamesId, getFewestCubesForGame, getPowerOfFewestCubes, getPowerForSet} = require('./solution')

describe('Day-2', () => {
    describe('first part', () => {
        describe('sumPossibleGamesId', () => {
            test('given a set of games, sum the possible game ids', () => {
                games = [
                    "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
                    "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
                    "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
                    "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
                    "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
                ];
                sum = sumPossibleGamesId(games);
                equal(
                    sum,
                    8
                );
            });
        });

        describe('parseGameString', () => {
            test('given a game, return the sets with the count', () => {
                game = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green";
                [id, sets] = parseGameString(game);
                equal(id, 1);
                deepEqual(
                    sets[0],
                    {
                        'blue': 3,
                        'red': 4
                    }
                );
                deepEqual(
                    sets[1],
                    {
                        'blue': 6,
                        'red': 1,
                        'green': 2
                    }
                );
                deepEqual(
                    sets[2],
                    {
                        'green': 2
                    }
                );
            });
        });

        describe('isGamePossible', () => {
            test('given sets, return true if extracted cubes adds up to 12 red cubes, 13 green cubes, and 14 blue cubes', () => {
                const isPossible = isGamePossible([
                    {
                        'blue': 3,
                        'red': 4
                    },
                    {
                        'blue': 6,
                        'red': 1,
                        'green': 2
                    },
                    {
                        'green': 2
                    }
                ]);
                equal(
                    isPossible,
                    true
                );
            });


            test('given sets, return true if extracted cubes adds up to 12 red cubes, 13 green cubes, and 14 blue cubes in each set', () => {
                const isPossible = isGamePossible([
                    {
                        'blue': 14,
                        'red': 4
                    },
                    {
                        'blue': 14,
                        'red': 1,
                        'green': 2
                    },
                    {
                        'green': 13
                    }
                ]);
                equal(
                    isPossible,
                    true
                );
            });

            test('given sets, return false if extracted cubes adds up to a set greater than 12 red cubes, 13 green cubes, and 14 blue cubes', () => {
                const isPossible = isGamePossible([
                    {
                        'blue': 6,
                        'red': 20,
                        'green': 8
                    },
                    {
                        'blue': 5,
                        'red': 4,
                        'green': 13
                    },
                    {
                        'green': 5,
                        'red': 1
                    }
                ]);
                equal(
                    isPossible,
                    false
                );
            });
        })
    });

    describe('second part', () => {
        describe('getFewestCubesForGame', () => {
            test('given a set from a game, it should return the fewest number of cubes for each color', () => {
                const set = [
                    {
                        'blue': 3,
                        'red': 4
                    },
                    {
                        'blue': 6,
                        'red': 1,
                        'green': 2
                    },
                    {
                        'green': 2
                    }
                ];
                const fewestCubes = getFewestCubesForGame(set);
                equal(fewestCubes['red'], 4);
                equal(fewestCubes['green'], 2);
                equal(fewestCubes['blue'], 6);
            });
        });

        describe('getPowerForSet', () => {
            test('given a set, return the power of the set', () => {
                const set = {
                    'red': 4,
                    'green': 2,
                    'blue': 6
                };
                const power = getPowerForSet(set);
                equal(power, 48);
            })
        })

        describe('getPowerOfFewestCubes', () => {
            test('given games, return the power of the fewest cubes in each game', () => {
                games = [
                    "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
                    "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
                    "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
                    "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
                    "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
                ];
                sum = getPowerOfFewestCubes(games);
                equal(
                    sum,
                    2286
                );
            });
        });
    });
});