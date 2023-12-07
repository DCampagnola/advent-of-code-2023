


function calculateTotalWinning(handsTable) {
    const hands = getHands(handsTable);
    const sortedHands = hands.sort((a, b) => b._hash - a._hash);
    let result = 0;
    let rank = hands.length;
    for (const hand of sortedHands) {
        result += rank * hand.bid;
        rank--;
    }
    return result;
}

function calculateTotalWinningWithJokerRule(handsTable) {
    const hands = getCardsWithJokerCard(handsTable);
    const sortedHands = hands.sort((a, b) => b._hash - a._hash);
    let result = 0;
    let rank = hands.length;
    for (const hand of sortedHands) {
        result += rank * hand.bid;
        rank--;
    }
    return result;
}

class Hand {
    cards;
    bid;
    isJokerRule;

    constructor(cards, bid, isJokerRule = false) {
        this.cards = cards;
        this.bid = bid;
        this.isJokerRule = isJokerRule;
    }

    get _availableCards() {
        if (this.isJokerRule) 
            return ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
        else 
            return ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
    }

    get _cardsByStrength() {
        if (this.isJokerRule) 
            return ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"];
        else 
            return ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
    }

    get _maxKindCount() {
        return Math.max(...Object.values(this._kindCount));
    }

    get _kindCount() {
        const kindCount = {};

        for (const card of this._availableCards) {
            kindCount[card] = 0;
        }
        for (const card of this.cards) {
            if (card == "J" && this.isJokerRule) continue;
            kindCount[card] += 1;
        }
        return kindCount;
    }

    get _jolly() {
        if (this.isJokerRule) return this.cards.filter((card) => card == "J").length;
        return 0;
    }

    get isFiveOfAKind() {
        return (this._maxKindCount + this._jolly) >= 5;
    }

    get isFourOfAKind() {
        return (this._maxKindCount + this._jolly) >= 4;
    }

    get isFullHouse() {
        if (this._jolly === 5) return true;
        const kindCountValues = Object.values(this._kindCount);
        return kindCountValues.filter((v) => v > 0).length == 2;
    }

    get isThreeOfAKind() {
        return (this._maxKindCount + this._jolly) >= 3;
    }

    get isTwoPair() {
        const kindCountValues = Object.values(this._kindCount);
        return kindCountValues.filter((v) => v > 0).length <= 3;
    }

    get isOnePair() {
        return !this.isHighCard;
    }

    get isHighCard() {
        if (this._jolly > 0) return false;
        const kindCountValues = Object.values(this._kindCount);
        const hasFiveKinds = kindCountValues.filter((count) => count > 0).length == 5;
        return hasFiveKinds;
    }

    get _hash() {
        let typeStrength = 0;
        if (this.isFiveOfAKind) typeStrength = 7;
        else if (this.isFourOfAKind) typeStrength = 6;
        else if (this.isFullHouse) typeStrength = 5;
        else if (this.isThreeOfAKind) typeStrength = 4;
        else if (this.isTwoPair) typeStrength = 3;
        else if (this.isOnePair) typeStrength = 2;
        else if (this.isHighCard) typeStrength = 1;

        let orderingStrength = 0;
        for(const card of this.cards) {
            const rankStrength = this._cardsByStrength.indexOf(card);
            const valueStrength = this._cardsByStrength.length - rankStrength - 1;
            orderingStrength = orderingStrength * 100 + valueStrength;
        }
        return typeStrength * Math.pow(100,5) + orderingStrength;
    }
}

function getHands(hands) {
    hands = hands.split("\n");
    const result = [];
    for (const hand of hands) {
        const [cardsString, bidString] = hand.split(" ");
        result.push(new Hand(cardsString.split(""), +bidString));
    }
    return result;
}

function getCardsWithJokerCard(handsTable) {
    const hands = handsTable.split("\n");
    const result = [];
    for (const hand of hands) {
        const [cardsString, bidString] = hand.split(" ");
        result.push(new Hand(cardsString.split(""), +bidString, true));
    }
    return result;
}

module.exports = {
    getHands,
    calculateTotalWinning,
    getCardsWithJokerCard,
    Hand,
    calculateTotalWinningWithJokerRule
};