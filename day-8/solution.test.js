const {describe, test} = require("node:test");
const {equal, deepEqual} = require("assert");
const { getStepsToZZZ, parseNetworkTable, Direction, getSimulaneouslyToEndingZ } = require("./solution");

const exampleNetworkTable = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

const exampleNetworkTableLoop = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

describe("Day 8", () => {
    describe("Part 1", () => {
        describe("getStepsToZZZ", () => {
            test("returns the right steps to ZZZ given the example network table", () => {
                equal(
                    getStepsToZZZ(exampleNetworkTable),
                    2
                )
            });
            test("returns the right steps to ZZZ given the example network table with loop", () => {
                equal(
                    getStepsToZZZ(exampleNetworkTableLoop),
                    6
                )
            });
        });

        describe("parseNetworkTable", () => {
            test("returns the parsed directions and network nodes given the example table", () => {
                const {
                    directions,
                    startingNode
                } = parseNetworkTable(exampleNetworkTable);
                deepEqual(
                    directions,
                    [Direction.RIGHT, Direction.LEFT]
                );
                equal(
                    startingNode.name,
                    "AAA"
                );
                equal(
                    startingNode.goRight().goLeft().name,
                    "ZZZ"
                );
            });
        });
    });

    describe("Part 2", () => {
        const exampleNetworkTable = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;
        describe("getSimulaneouslyToEndingZ", () => {
            test("return the correct steps to get simultaneously to node that ends to Z", () => {
                equal(
                    getSimulaneouslyToEndingZ(
                        exampleNetworkTable,
                    ),
                    6
                );
            });
        });
    });
});