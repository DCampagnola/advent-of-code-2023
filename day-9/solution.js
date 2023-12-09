
function sumExtrapolatedValues(reportString) {
    const report = getReport(reportString);
    let sum = 0;
    for(const history of report) {
        sum+=history.extrapolateValue();
    }
    return sum;
}
function sumBackwardsExtrapolatedValues(reportString) {
    const report = getReport(reportString);
    let sum = 0;
    for(const history of report) {
        sum+=history.extrapolateValueBackward();
    }
    return sum;
}

function extrapolateHistory(history) {
    const increments = [];
    let prevValue = history[0];
    for (let i = 1; i<history.length; i++) {
        increments.push(history[i] - prevValue);
        prevValue = history[i];
    }
    const isZero = increments.every((inc) => inc == 0);
    if (!isZero) {
        const lowerIncrements = extrapolateHistory(increments);
        increments.push(
            lowerIncrements[lowerIncrements.length - 1] +
            increments[increments.length - 1]
        );
    }
    return increments;
}
function extrapolateHistoryBackwards(history) {
    const increments = [];
    let prevValue = history[0];
    for (let i = 1; i<history.length; i++) {
        increments.push(history[i] - prevValue);
        prevValue = history[i];
    }
    const isZero = increments.every((inc) => inc == 0);
    if (!isZero) {
        const lowerIncrements = extrapolateHistoryBackwards(increments);
        increments.unshift(
            increments[0] -
            lowerIncrements[0]
        );
    } else {
        increments.unshift(0);
    }
    return increments;
}

function getReport(reportString) {
    const reportLines = reportString.split("\n");
    const report = [];
    for(const reportLine of reportLines) {
        report.push(new History(reportLine.split(" ").map(Number)));
    }
    return report;
}

class History {
    initialValues;

    constructor(initialValues) {
        this.initialValues = initialValues;
    }

    extrapolateValue() {
        const values = extrapolateHistory(this.initialValues);
        return values[values.length - 1] + this.initialValues[this.initialValues.length - 1];
    }

    extrapolateValueBackward() {
        const values = extrapolateHistoryBackwards(this.initialValues);
        return this.initialValues[0] - values[0];
    }
}

module.exports = {
    sumExtrapolatedValues,
    getReport,
    sumBackwardsExtrapolatedValues
}