const { describe, test } = require("node:test");
const { equal, deepEqual } = require("assert");
const { parseStringToReflection, isHorizontalReflection, isVerticalReflection, summarizeReflections } = require("./solution");

const firstExample = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.`;

const secondExample = `#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

describe("Day 13", () => {
    describe("Part 1", () => {
        describe("parseStringToReflection", () => {
            test("returns the correct matrix given the example", () => {
                const reflection = parseStringToReflection(firstExample);

                equal(reflection.length, 7);
                equal(reflection[0].length, 9);
            });
        });

        describe("isHorizontalReflection", () => {
            test("returns true given the second example reflection and the correct row", () => {
                equal(
                    isHorizontalReflection(parseStringToReflection(secondExample), 4),
                    true
                );
                equal(
                    isHorizontalReflection(parseStringToReflection(secondExample), 3),
                    false
                );
            });
        });

        describe("isVerticalReflection", () => {
            test("returns true given the first example reflection and the correct column", () => {
                equal(
                    isVerticalReflection(parseStringToReflection(firstExample), 5),
                    true
                );
                equal(
                    isVerticalReflection(parseStringToReflection(firstExample), 3),
                    false
                );
            });
        });

        describe("summarizeReflections", () => {
            test("returns the summary sum given the firstt and second example", () => {
                equal(
                    summarizeReflections(
                        `${firstExample}\n\n${secondExample}`,
                    ),
                    405
                );
            });
        });
    });

    describe("Part 2", () => {
        test("returns new summarizing value given the example and the smudge tollerance", () => {
            equal(
                summarizeReflections(
                    `${firstExample}\n\n${secondExample}`,
                    true
                ),
                400
            );
        });
    })
})