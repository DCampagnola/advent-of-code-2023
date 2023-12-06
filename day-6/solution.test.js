const { describe, test } = require("node:test");
const { getProductRecordBeat, getRacesFromDocument, getRaceFromDocumentWithoutKerning, getRecordBeatWithoutKerning } = require("./solution");
const { equal } = require("assert");

const exampleRacesDocument = `Time:      7  15   30
Distance:  9  40  200`;

describe("Day 6", () => {
    describe("Part 1", () => {
        describe("getProductRecordBeat", () => {
            test("returns the correct product of times each record can be beaten", () => {
                equal(
                    getProductRecordBeat(exampleRacesDocument),
                    288
                );
            });
        });

        describe("getRacesFromDocument", () => {
            test("returns a class with the correct amount of races given a race document", () => {
                equal(
                    getRacesFromDocument(exampleRacesDocument).length,
                    3
                );
            });

            test("returns a class with the correct time and distance", () => {
                equal(
                    getRacesFromDocument(exampleRacesDocument)[0].distanceRecord,
                    9
                );
                equal(
                    getRacesFromDocument(exampleRacesDocument)[0].time,
                    7
                );
            });
        });

        describe("distanceByHolding", () => {
            const firstExampleRace = getRacesFromDocument(exampleRacesDocument)[0];

            test("returns 0mm if button has been hold 0ms", () => {
                equal(
                    firstExampleRace.distanceByHolding(0),
                    0
                );
            });
            test("returns 0mm if button has been hold 0ms", () => {
                equal(
                    firstExampleRace.distanceByHolding(3),
                    12
                )
            });
        });

        describe("isRecordBeatenByHolding", () => {
            const firstExampleRace = getRacesFromDocument(exampleRacesDocument)[0];
            test("returns true given a holding time of 2 ms", () => {
                equal(
                    firstExampleRace.isRecordBeatenByHolding(2),
                    true
                );
            });

            test("returns false given a holding time of 1 ms", () => {
                equal(
                    firstExampleRace.isRecordBeatenByHolding(1),
                    false
                );
            });
        });

        describe("getTimesToBeatRecord", () => {
            const exampleRaces = getRacesFromDocument(exampleRacesDocument);
            const firstExampleRace = exampleRaces[0];
            const secondExampleRace = exampleRaces[1];
            const thirdExampleRace = exampleRaces[2];

            test("returns 4 given the first race", () => {
                equal(
                    firstExampleRace.getTimesToBeatRecord(),
                    4
                );
            });
            test("returns 8 given the second race", () => {
                equal(
                    secondExampleRace.getTimesToBeatRecord(),
                    8
                );
            });
            test("returns 9 given the third race", () => {
                equal(
                    thirdExampleRace.getTimesToBeatRecord(),
                    9
                );
            });
        });


        describe("getRaceFromDocumentWithoutKerning", () => {
            test("returns a class with the correct time and distance", () => {
                equal(
                    getRaceFromDocumentWithoutKerning(exampleRacesDocument).distanceRecord,
                    940200
                );
                equal(
                    getRaceFromDocumentWithoutKerning(exampleRacesDocument).time,
                    71530
                );
            });
        });


        describe("getRecordBeatWithoutKerning", () => {
            test("returns the times that the record can be beaten considering the kerning of a given race document", () => {
                equal(
                    getRecordBeatWithoutKerning(exampleRacesDocument),
                    71503
                );
            });
        });
    });
});