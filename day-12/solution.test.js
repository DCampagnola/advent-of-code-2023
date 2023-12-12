const { countArrangements, sumPossileArrangments } = require("./solution");
const { describe, test } = require("node:test");
const { equal } = require("assert")
const exampleRecordString = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;
describe("Day 12", () => {
    describe("Part 1", () => {

        describe("countArrangements", () => {
            test("returns the correct count given an example line", () => {
                const nArrangements = countArrangements(
                    "?###????????",
                    [3,2,1]
                )
                equal(
                    nArrangements,
                    10
                )
            });

            test("returns correct count given second example line", () => {
                equal(
                    countArrangements(
                        ".??..??...?##.",
                        [1,1,3]
                    ),
                    4
                )
            });
        });

        describe("sumPossileArrangments", () => {
            test("returns the correct sum given the example records", () => {
                equal(
                    sumPossileArrangments(exampleRecordString),
                    21
                )
            });
        })
    });
})