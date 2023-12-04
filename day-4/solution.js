function sumScoreForScratchCards(scratchcards) {
    return scratchcards
        .split("\n")
        .map(getScoreForScratchCard)
        .reduce((acc, score) => acc + score, 0);
}

function getScoreForScratchCard(scratchcard) {
    const matchingWinningNumbers = getMatchingCountForScratchCard(scratchcard);
    if (matchingWinningNumbers === 0) return 0;
    if (matchingWinningNumbers === 1) return 1;

    return Math.pow(2, (matchingWinningNumbers - 1));
}

function getWinningNumbersForScratchCard(scratchcard) {
    let winningNumbersString = scratchcard.substring(scratchcard.indexOf(':') + 2, scratchcard.indexOf('|') - 1);
    winningNumbersString = winningNumbersString.replaceAll(/ +/g, ' ').trim();
    return winningNumbersString.split(" ").map(Number)
}

function getNumbersForScratchCard(scratchcard) {
    let numbersString = scratchcard.substring(scratchcard.indexOf('|') + 2);
    numbersString = numbersString.replaceAll(/ +/g, ' ').trimLeft();
    return numbersString.split(" ").map(Number)
}


function getTotalCardWithCopiedCards(scratchcards) {
    scratchcards = scratchcards.split("\n");
    const copyCards = [];
    let scratchcardsWon = 0;
    for(let index = 0; index<scratchcards.length; index++) {
        const scratchcard = scratchcards[index];
        const won = getMatchingCountForScratchCard(scratchcard);
        const availableCards = (copyCards[index] || 0) + 1;
        for (let i = 0; i < won; i++) {
            copyCards[i + index + 1] = (copyCards[i + index + 1] || 0) + availableCards;
        }
        scratchcardsWon+=availableCards;
    }
    return scratchcardsWon;
}

function getScratchCardIndex(scratchcard) {
    let cardString = scratchcard.substring(0, scratchcard.indexOf(':')).trim();
    cardString = cardString.replaceAll(/ +/g, ' ');
    const cardNumber = Number(cardString.substring(cardString.indexOf(" ") + 1));
    return cardNumber;
}

function getMatchingCountForScratchCard(scratchcard) {
    const winningNumbers = getWinningNumbersForScratchCard(scratchcard);
    const numbers = getNumbersForScratchCard(scratchcard);
    const winningNumbersMap = winningNumbers.reduce(
        (acc, n) => ({
            ...acc,
            [n]: true,
        }),
        {}
    );
    const matchingWinningNumbers = numbers
        .map(
            (n) => winningNumbersMap[n] ? 1 : 0
        )
        .reduce(
            (acc, n) => acc + n,
            0
        );
    return matchingWinningNumbers;
}

module.exports = {
    sumScoreForScratchCards,
    getScoreForScratchCard,
    getWinningNumbersForScratchCard,
    getNumbersForScratchCard,
    getTotalCardWithCopiedCards,
    getMatchingCountForScratchCard,
    getScratchCardIndex
}

