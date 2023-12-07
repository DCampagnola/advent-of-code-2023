const { equal, deepEqual } = require("assert");
const { describe, test } = require("node:test");
const { getHands, Hand, calculateTotalWinning, getCardsWithJokerCard, calculateTotalWinningWithJokerRule } = require("./solution");

const exampleHandsTable = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

describe('Day 7', () => {
    describe("Part 1", () => {
        describe("calculateTotalWinning", () => {
            test("returns the total winnings given the example hands", () => {
                equal(
                    calculateTotalWinning(exampleHandsTable),
                    6440
                );
            });
        });

        describe("getHands", () => {
            test("returns an array of Hand class with the correct amounts", () => {
                const hands = getHands(exampleHandsTable);
                equal(hands.length, 5);
                equal(
                    hands[0].bid,
                    765
                );
                deepEqual(
                    hands[0].cards,
                    ["3", "2", "T", "3", "K"]
                );
            });
        });

        describe("Hand", () => {
            const exampleHands = getHands(exampleHandsTable);

            const getHandFromString = (str) => new Hand(str.split(""), 0);

            describe(".isFiveOfAKind", () => {
                test("returns true if given an hand with five of a kind", () => {
                    equal(
                        getHandFromString("AAAAA").isFiveOfAKind,
                        true
                    );
                });
            });
            describe(".isFourOfAKind", () => {
                test("returns true if given an hand with four of a kind", () => {
                    equal(
                        getHandFromString("AAAAK").isFourOfAKind,
                        true
                    );
                });
            });
            describe(".isThreeOfAKind", () => {
                test("returns true if given an hand with four of a kind", () => {
                    equal(
                        getHandFromString("AAAKK").isThreeOfAKind,
                        true
                    );
                });
            });

            describe(".isFullHouse", () => {
                test("returns true if given an hand with full house", () => {
                    equal(
                        getHandFromString("AAAKK").isFullHouse,
                        true
                    );
                });
            });

            describe(".isTwoPair", () => {
                test("returns true if given an hand with two pairs", () => {
                    equal(
                        getHandFromString("AA5KK").isTwoPair,
                        true
                    );
                });
            });

            describe(".isOnePair", () => {
                test("returns true if given an hand with only one pair pairs", () => {
                    equal(
                        getHandFromString("A23A4").isOnePair,
                        true
                    );
                });
            });

            describe(".isHighCard", () => {
                test("returns true if given an hand with only distinct labels", () => {
                    equal(
                        getHandFromString("23456").isHighCard,
                        true
                    );
                });
            });

            describe("._hash", () => {
                test("can be used to sort cards by its strength", () => {
                    const sortedHands = exampleHands.sort((a, b) => b._hash - a._hash);
                    equal(
                        sortedHands[0]._hash,
                        getHandFromString("QQQJA")._hash
                    );
                    equal(
                        sortedHands[1]._hash,
                        getHandFromString("T55J5")._hash
                    );
                    equal(
                        sortedHands[2]._hash,
                        getHandFromString("KK677")._hash
                    );
                    equal(
                        sortedHands[3]._hash,
                        getHandFromString("KTJJT")._hash
                    );
                    equal(
                        sortedHands[4]._hash,
                        getHandFromString("32T3K")._hash
                    );
                });

                test("can be used to compare two cards by its strength", () => {
                    equal(
                        getHandFromString("32T3K")._hash < getHandFromString("KK677")._hash,
                        true
                    );
                    equal(
                        getHandFromString("KTJJT")._hash < getHandFromString("KK677")._hash,
                        true
                    );
                    equal(
                        getHandFromString("T55J5")._hash < getHandFromString("QQQJA")._hash,
                        true
                    );
                });
    
            });

        });
    });

    describe("Part 2", () => {
        const getHandFromString = (str) => new Hand(str.split(""), 0, true);
        describe("calculateTotalWinningWithJokerRule", () => {
            test("returns the correct value given the exampleHands", () => {
                equal(
                    calculateTotalWinningWithJokerRule(exampleHandsTable),
                    5905
                );
            });
        });

        describe("getCardsWithJokerCard", () => {
            test("returns the correct cards given the example hands table", () => {
                const cards = getCardsWithJokerCard(exampleHandsTable);
                equal(
                    cards.length,
                    5
                );
                equal(
                    getHandFromString("T55J5").isFourOfAKind,
                    true
                );
                equal(
                    getHandFromString("KTJJT").isFourOfAKind,
                    true
                );
                equal(
                    getHandFromString("QQQJA").isFourOfAKind,
                    true
                );
                equal(
                    getHandFromString("QQTJA").isTwoPair,
                    true
                );
                equal(
                    getHandFromString("QQT4A").isTwoPair,
                    false
                );
                equal(
                    getHandFromString("KTJJT")._hash > getHandFromString("KK677")._hash,
                    true
                );
                equal( 
                    getHandFromString("QQQQ2")._hash > getHandFromString("JKKK2")._hash,
                    true
                );
                equal(
                    getHandFromString("QJJQ2").isFourOfAKind,
                    true
                );
            });
        });
    });
});