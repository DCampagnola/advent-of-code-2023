const { equal, deepEqual } = require("assert");
const { describe, test } = require("node:test");
const { sumScoreForScratchCards, getScoreForScratchCard, getWinningNumbersForScratchCard, getNumbersForScratchCard, getTotalCardWithCopiedCards, getMatchingCountForScratchCard, getScratchCardIndex } = require("./solution");

describe('Day 4', () => {
    describe('Part 1', () => {
        describe('sumScoreForScratchCards', () => {
            test('returns the sum of the scores of each given scratchcard', () => {
                const scratchcards = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`
                equal(
                    sumScoreForScratchCards(scratchcards),
                    13
                );
            });
        });

        describe('getScoreForScratchCard', () => {
            test('returns the score of a given scratchcard', () => {
                const scratchcard = `Card 100: 41 48 83 86 17 | 83 86  6 31 17  9 48 53`
                equal(
                    getScoreForScratchCard(scratchcard),
                    8
                );
            });

        });

        describe('getWinningNumbersForScratchCard', () => {
            test('returns an array of winning numbers given a scratchcard', () => {
                const scratchcard = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53`
                deepEqual(
                    getWinningNumbersForScratchCard(scratchcard),
                    [41, 48, 83, 86, 17]
                );
            });
        });

        describe('getNumbersForScratchCard', () => {
            test('returns an array of numbers given a scratchcard', () => {
                const scratchcard = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53`
                deepEqual(
                    getNumbersForScratchCard(scratchcard),
                    [83, 86, 6, 31, 17, 9, 48, 53]
                );
            });

            test('returns the correct array of numbers given a scratchcard with spaces', () => {
                const scratchcard = "Card   2: 94 57 54 45  9 78 71 35 48 44 |  9 56 28 57";
                deepEqual(
                    getNumbersForScratchCard(scratchcard),
                    [9, 56, 28, 57]
                )
            })
        });
    });

    describe('Part 2', () => {
        describe('getTotalCardWithCopiedCards', () => {
            test("returns the number of card used until none has been won", () => {
                const scratchcards = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;
                equal(
                    getTotalCardWithCopiedCards(scratchcards),
                    30
                );
            });
        });

        describe('getMatchingCountForScratchCard', () => {
            test("returns the number of numbers matching given a scratchcard", () => {
                const scratchcards = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53`;
                equal(
                    getMatchingCountForScratchCard(scratchcards),
                    4
                );
            })
        });
        describe('getScratchCardIndex', () => {

            test('returns the scratchcard number', () => {
                const scratchcard = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53`;
                equal(
                    getScratchCardIndex(scratchcard),
                    1
                )
            });

            test('returns the scratchcard number given a scratchcard with spaces', () => {
                const scratchcard = `Card   1 : 41 48 83 86 17 | 83 86  6 31 17  9 48 53`;
                equal(
                    getScratchCardIndex(scratchcard),
                    1
                )
            });

        })
    });
});