
const { describe, test } = require("node:test");
const { equal, deepEqual } = require("assert");
const { tiltNord, calculateLoad, calculateLoadAfterTilt } = require("./solution");

const example = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

const exampleAfterTilt = `OOOO.#.O..
OO..#....#
OO..O##..O
O..#.OO...
........#.
..#....#.#
..O..#.O.O
..O.......
#....###..
#....#....`;

describe("Day 14", () => {
    describe("Part 1", () => {
        describe("tiltNord", () => {
            test("return the map with rocks after north tilt given the example map", () => {
                equal(
                    tiltNord(example),
                    exampleAfterTilt
                )
            });
        });

        describe("calculateLoad", () => {
            test("returns the load on the north boundary given the example tilted map", () => {
                equal(
                    calculateLoad(exampleAfterTilt),
                    136
                )
            });
        });

        describe("calculateLoadAfterTilt", () => {
            test("returns the load on the north boundary given the example map", () => {
                equal(
                    calculateLoadAfterTilt(example),
                    136
                )
            });
        });
    });
});