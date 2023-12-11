const { parseInput, Pipe, maxStepsFromStart, countLoopingWithStartingPipe, getNextCoordinates, Direction, countInnerArea } = require("./solution");

const { describe, test } = require("node:test");
const {deepEqual, equal} = require("assert");

const exampleSquareLoopInput = `.....
.S-7.
.|.|.
.L-J.
.....`

const exampleComplexLoopInput = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;

describe("Day 10", () => {
    describe("Part 1", () => {
        describe("maxStepsFromStart", () => {
            test("returns the correct steps from starting point to farthest point given the square loop example", () => {
                equal(
                    maxStepsFromStart(exampleSquareLoopInput),
                    4
                )
            });
            test("returns the correct steps from starting point to farthest point given the complex loop example", () => {
                equal(
                    maxStepsFromStart(exampleComplexLoopInput),
                    8
                );
            });
        });

        describe("parseInput", () => {
            test("returns starting point coordinates and parsed pipemap given the example pipe map", () => {
                const {
                    startingCoordinates,
                    pipeMap
                } = parseInput(exampleSquareLoopInput);
                deepEqual(
                    startingCoordinates,
                    [1,1]
                );
                equal(pipeMap[0][0], Pipe.GROUND);
                equal(pipeMap[2][2], Pipe.GROUND);
                equal(pipeMap[3][3], Pipe.NORTH_WEST);
            });
        });

        describe("countLoopingWithStartingPipe", () => {
            const {pipeMap: squareLoopMap, startingCoordinates: squareLoopStart} = parseInput(exampleSquareLoopInput);
            const {pipeMap: complexLoopMap, startingCoordinates: complexLoopStart} = parseInput(exampleComplexLoopInput);

            test("returns true given a south east pipe for the example square loop", () => {
                equal(countLoopingWithStartingPipe(squareLoopMap, squareLoopStart, Pipe.SOUTH_EST), 8);
            });
            test("returns false given a vertical pipe for the example square loop", () => {
                equal(countLoopingWithStartingPipe(squareLoopMap, squareLoopStart, Pipe.VERTICAL), null);
            });
            test("returns steps given a south east pipe for the example complex loop", () => {
                equal(countLoopingWithStartingPipe(complexLoopMap, complexLoopStart, Pipe.SOUTH_EST), 16);
            });
        });

        describe("getNextCoordinates", () => {
            test("returns above coordinates given a vertical pipe and a UP direction", () => {
                deepEqual(getNextCoordinates([0,0], Pipe.VERTICAL, Direction.UP), [[-1,0], Direction.UP]);
            });
            test("returns right coordinates given a south_east pipe and a UP direction", () => {
                deepEqual(getNextCoordinates([0,0], Pipe.SOUTH_EST, Direction.UP), [[0,1], Direction.RIGHT]);
            });
            test("returns below coordinates and a down direction given a  pipe and a UP direction", () => {
                deepEqual(getNextCoordinates([0,0], Pipe.SOUTH_WEST, Direction.RIGHT), [[1,0], Direction.DOWN]);
            });
            test("returns left coordinates given a pipe and a DOWN direction", () => {
                deepEqual(getNextCoordinates([0,0], Pipe.SOUTH_WEST, Direction.UP), [[0,-1], Direction.LEFT]);
            });
            test("returns null given an impossible direction", () => {
                equal(getNextCoordinates([0,0], Pipe.SOUTH_WEST, Direction.DOWN), null);
            });
        });
    });

    describe("Part 2", () => {
        const simpleLoop = `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`;
        const largeLoop = `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`;
        describe("countInnerArea", () => {
            test("returns 4 given the simple loop", () => {
                equal(countInnerArea(simpleLoop), 4)
            });
            test("returns 8 given a larger loop", () => {
                equal(countInnerArea(largeLoop), 8)
            });
        });
    });
});