const {describe, test} = require("node:test");
const {equal, deepEqual} = require("assert");
const { sumExtrapolatedValues, getReport, sumBackwardsExtrapolatedValues } = require("./solution");

const exampleReport = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;
describe("Day 9", () => {
    describe("Part 1", () => {
        describe("sumExtrapolatedValues", () =>{
            test("returns the right sum given the example report", () => {
                equal(
                    sumExtrapolatedValues(exampleReport),
                    114
                )
            });
        });

        describe("getReport", () => {
            test("returns the correct array of history found in the given report", () => {
                const report = getReport(exampleReport);
                equal(report.length, 3);
                deepEqual(report[0].initialValues, [0, 3, 6, 9, 12,15]);
            });
        });

        describe("History", () => {
            const report = getReport(exampleReport);;

            describe(".extrapolateValue", () => {
                test("returns the correct extrapolated value given the first history in the example report", () => {
                    equal(
                        report[0].extrapolateValue(),
                        18
                    );
                });

                test("returns the correct extrapolated value given the second history in the example report", () => {
                    equal(
                        report[1].extrapolateValue(),
                        28
                    );
                });
            });
        });
    });

    describe("Part 2", () => {
        const backwardExample = "10 13 16 21 30 45";

        describe("sumBackwardsExtrapolatedValues", () => {
            equal(sumBackwardsExtrapolatedValues(backwardExample), 5)
        });

    });
});