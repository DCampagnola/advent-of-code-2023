const assert = require("assert");
const { test, describe } = require("node:test");
const { toTrie, getFirstNumber, getLastNumber, mainPart1, mainPart2 } = require("./solution");

describe('Day 1', () => {

    describe('toTrie', () => {
        test('it should get a trie structure', () => {
            assert.deepEqual(
                toTrie([
                    ['v1', 1],
                    ['v2', 2],
                    ['aV3', 3],
                ]),
                {
                    'v': {
                        '1': 1,
                        '2': 2
                    },
                    'a': {
                        'V': {
                            '3': 3
                        }
                    }
                }
            )
        })
    })

    describe('getFirstNumber', () => {
        test('it should get the first digit', () => {
            assert.equal(
                getFirstNumber('askd02gs'),
                0
            );
        })
    });

    describe('getLastNumber', () => {
        test('it should get the first digit', () => {
            assert.equal(
                getLastNumber('askd02gs'),
                2
            );
        })
    });

    describe('mainPart1', () => {
        test('returns sum of digits', () => {
            assert.equal(
                mainPart1([
                    '1abc2',
                    'pqr3stu8vwx',
                    'a1b2c3d4e5f',
                    'treb7uchet'
                ]),
                142
            )
        })
    });

    describe('mainPart2', () => {
        test('returns sum of digits', () => {
            assert.equal(
                mainPart2([
                    'two1nine',
                    'eightwothree',
                    'abcone2threexyz',
                    'xtwone3four',
                    '4nineeightseven2',
                    'zoneight234',
                    '7pqrstsixteen'
                ]),
                281
            )
        });
    });
})