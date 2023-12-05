const { equal, deepEqual } = require("assert");
const { describe, test } = require("node:test");
const { getLowestLocationFromSeeds, Almanac, AlmanacMap, getLowestLocationFromRangeOfSeeds } = require("./solution");

const exampleAlmanac = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

describe('Day 5', () => {
    describe('Part 1', () => {
        describe('getLowestLocationFromSeeds', () => {
            test('returns the lowest locations given an almanac with a list of seeds', () => {
                equal(
                    getLowestLocationFromSeeds(exampleAlmanac),
                    35
                );
            });
        });

        describe('Almanac class', () => {
            describe("Almanac.fromString", () => {
                test('returns the correct almanac class given an almanac string', () => {
                    const almanac = Almanac.fromString(exampleAlmanac);
                    deepEqual(
                        almanac.seeds,
                        [79, 14, 55, 13]
                    );
                });
            });

            describe('getDistanceFromSeed', () => {
                test("returns the correct distance given a seed", () => {
                    const almanac = Almanac.fromString(exampleAlmanac);
                    equal(
                        almanac.getDistanceFromSeed(13),
                        35
                    )
                });
            });
        });

        describe('AlmanacMap class', () => {
            describe('AlmanacMap.fromString', () => {
                const mapString = "50 98 2\n"+
                                  "52 50 48"
                test('returns the correct AlmanacMap instance given a string of map', () => {
                    const almanacMap = AlmanacMap.fromString(mapString);
                    deepEqual(
                        almanacMap.map,
                        [
                            [50,52,48],
                            [98,50,2],
                        ]
                    );
                });
            });

            describe('get', () => {
                test('returns the corresponding destination value given a starting value', () => {
                    const almanacMap = new AlmanacMap([
                        [50,52,48],
                        [98,50,2],
                    ]);
                    equal(
                        almanacMap.get(50),
                        52
                    );
                    equal(
                        almanacMap.get(99),
                        51
                    );
                    equal(
                        almanacMap.get(100),
                        100
                    );
                    equal(
                        almanacMap.get(40),
                        40
                    );
                    equal(
                        almanacMap.get(79),
                        81
                    );
                });
            });
        });
    });

    describe('Part 2', () => {
        describe('getLowestLocationFromRangeOfSeeds', () => {
            test('returns the lowest location distance considering range of seeds', () => {
                equal(
                    getLowestLocationFromRangeOfSeeds(exampleAlmanac),
                    46
                )
            });
        });
    });
})