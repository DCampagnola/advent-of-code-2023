const { describe, test } = require("node:test");
const { equal, deepEqual } = require("assert");
const { getDistance, sumGalaxiesShortestPath, getGravitationalRowsCols } = require("./solution");

const exampleGalaxy = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

describe("Day 11", () => {
    describe("Part 1", () => {
        describe("getDistance", () => {
            test("returns the distance between two coordinates", () => {
                equal(
                    getDistance(
                        [0, 1],
                        [5, 5],
                    ),
                    9
                );
            });
        });

        describe("sumGalaxiesShortestPath", () => {
            test("returns the correct sum given the example galaxy", () =>{ 

                equal(
                    sumGalaxiesShortestPath(exampleGalaxy),
                    374
                );
            });
        });

        describe("getGravitationalRowsCols", () => {
            test("returns the rows and cols without galaxies to be expanded given the example galaxy", () =>{ 
                const galaxy = exampleGalaxy.split("\n").map((s) => s.split(""));
                
                const {rows, cols} = getGravitationalRowsCols(galaxy);
                deepEqual(
                    rows,
                    [3, 7]
                );
                deepEqual(
                    cols,
                    [2, 5,8]
                );
            });
        });
    });

    describe("Part 2", () => {

        describe("sumGalaxiesShortestPath", () => {
            test("returns the correct sum given the example galaxy with a gravitational pull of 10", () =>{ 

                equal(
                    sumGalaxiesShortestPath(exampleGalaxy, 10),
                    1030
                );
            });
        });
    });
});