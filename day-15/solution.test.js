const { describe, test } = require("node:test");
const { equal, deepEqual } = require("assert");
const { hashString, calculateInitializationSequenceHash, calculateFocusingPower } = require("./solution");

describe("Day 15", () => {
    describe("Part 1", () => {
        describe("calculateInitializationSequenceHash", () => {
            test("returns 1320 given the example initialization sequence", () => {
                equal(
                    calculateInitializationSequenceHash("rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7"),
                    1320
                );
            });
        });

        describe("hashString", () => {
            test("returns 52 given the example string HASH", () => {
                equal(
                    hashString("HASH"),
                    52
                );
            });
        })
    });

    describe("Part 2", () => {
        describe("calculateFocusingPower", () => {
            test("returns 145 given the example initialization sequence", () => {
                equal(
                    calculateFocusingPower(
                        "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7",
                    ),
                    145
                );
            });
        })
    });
});