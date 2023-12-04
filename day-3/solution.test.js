const { equal, deepEqual } = require("assert");
const { describe, test } = require("node:test");
const { sumPartNumberOfEngine, getNumbersOfEngine, getSymbolsOfEngine, isNumberPartOfEngine, sumGearRatiosForEngine, getGearsForEngine, getPartNumberMatrix, getGearRatio } = require("./solution");


describe('Day 3', () => {
    describe('Part 1', () => {
        describe('sumPartNumberOfEngine', () => {
            test('given an engine, it should return the sum of every part number', () => {
                const engine = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;
                equal(
                    sumPartNumberOfEngine(engine),
                    4361
                );
            });
        });

        describe('getNumbersOfEngine', () => {
            test('given an engine, it should return for each number in the engine, the index reference', () => {
                const engine = `467..114.1
01.*......
..35......`;
                const expectedResult = [
                    {
                        number: 467,
                        line: 0,
                        from: 0,
                        to: 2,
                    },
                    {
                        number: 114,
                        line: 0,
                        from: 5,
                        to: 7,
                    },
                    {
                        number: 1,
                        line: 0,
                        from: 9,
                        to: 9,
                    },
                    {
                        number: 1,
                        line: 1,
                        from: 0,
                        to: 1,
                    },
                    {
                        number: 35,
                        line: 2,
                        from: 2,
                        to: 3,
                    },
                ];
                deepEqual(
                    getNumbersOfEngine(engine),
                    expectedResult
                );
            });
        });

        describe('getSymbolsOfEngine', () => {
            test('given an engine, get a map of the symbols found in the engine', () => {
                const engine = `467..114.1
01.*......
..35..#...`;
                deepEqual(
                    getSymbolsOfEngine(engine),
                    {
                        [[1, 3]]: true,
                        [[2, 6]]: true
                    }
                )
            });
        });

        describe('isNumberPartOfEngine', () => {
            test('returns true when given a part numer in the engine and symbols of engine', () => {
                const symbolsOfEngine = {
                    [[1, 3]]: true,
                    [[2, 6]]: true
                };
                const numberPart = {
                    number: 467,
                    line: 0,
                    from: 0,
                    to: 2,
                }
                equal(
                    isNumberPartOfEngine(numberPart, symbolsOfEngine),
                    true,
                );
            });

            test('returns false when given a numer not part in the engine and symbols of engine', () => {
                const symbolsOfEngine = {
                    [[1, 3]]: true,
                    [[2, 6]]: true
                };
                const numberPart = {
                    number: 114,
                    line: 0,
                    from: 5,
                    to: 7,
                };
                equal(
                    isNumberPartOfEngine(numberPart, symbolsOfEngine),
                    false,
                );
            });
        });
    });

    describe('Part 2', () => {
        describe('sumGearRatiosForEngine', () => {
            test('returns the sum of each gear ratios in the engine', () => {
                const engine = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;
                equal(
                    sumGearRatiosForEngine(engine),
                    467835
                );
            });
        });
        describe('getGearsForEngine', () => {
            test('returns the gears coordinates given an engine', () => {
                const engine = `467..114..
...*......
..35..633.
......#...
617*......`;
                deepEqual(
                    getGearsForEngine(engine),
                    [
                        [1, 3],
                        [4, 3]
                    ]
                )
            });
        });

        describe('getPartNumberMatrix', () => {
            test('returns a dict with part number identifier given part numbers', () => {
                const partNumbers = [
                    {
                        number: 1,
                        line: 0,
                        from: 4,
                        to: 5
                    },
                    {
                        number: 2,
                        line: 1,
                        from: 0,
                        to: 3
                    }
                ];
                deepEqual(
                    getPartNumberMatrix(partNumbers),
                    {
                        [[0, 4]]: 0,
                        [[0, 5]]: 0,
                        [[1, 0]]: 1,
                        [[1, 1]]: 1,
                        [[1, 2]]: 1,
                        [[1, 3]]: 1,
                    }
                );
            });
        });

        describe('getGearRatio', () => {
            const partNumbers = [
                {
                    number: 1,
                    line: 0,
                    from: 4,
                    to: 5
                },
                {
                    number: 2,
                    line: 1,
                    from: 0,
                    to: 3
                },

                {
                    number: 2,
                    line: 1,
                    from: 0,
                    to: 3
                }
            ];
            test("returns ratio given a gear with 2 adjacent part numers", () => {
                const gear = [0,3];
                const partNumbersMatrix = {
                    [[0, 4]]: 0,
                    [[0, 5]]: 0,
                    [[1, 0]]: 1,
                    [[1, 1]]: 1,
                    [[1, 2]]: 1,
                    [[1, 3]]: 1,
                };
                equal(
                    getGearRatio(gear, partNumbersMatrix, partNumbers),
                    2
                );
            });
            test("returns null given a gear without any adjacent part number", () => {
                const gear = [4,3];
                const partNumbersMatrix = {
                    [[0, 4]]: 0,
                    [[0, 5]]: 0,
                    [[1, 0]]: 1,
                    [[1, 1]]: 1,
                    [[1, 2]]: 1,
                    [[1, 3]]: 1,
                };
                equal(
                    getGearRatio(gear, partNumbersMatrix, partNumbers),
                    null
                );
            });
            test("returns null given a gear with 3 adjacent part number", () => {
                const gear = [1,0];
                const partNumbersMatrix = {
                    [[0, 1]]: 0,
                    [[0, 2]]: 0,
                    [[1, 1]]: 1,
                    [[1, 2]]: 1,
                    [[1, 3]]: 1,
                    [[1, 0]]: 1,
                    [[2, 1]]: 2,
                    [[2, 2]]: 2,
                    [[2, 3]]: 2,
                };
                equal(
                    getGearRatio(gear, partNumbersMatrix, partNumbers),
                    null
                );
            });
        });
    });
});