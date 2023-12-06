
function getProductRecordBeat(racesDocument) {
    const races = getRacesFromDocument(racesDocument);
    let product = 1;
    for (const race of races) {
        product *= race.getTimesToBeatRecord();
    }
    return product;
}

function getRecordBeatWithoutKerning(racesDocument) {
    const race = getRaceFromDocumentWithoutKerning(racesDocument);
    return race.getTimesToBeatRecord();
}

function zip(arrayA, arrayB) {
    return arrayA.map((a, i) => [a, arrayB[i]]);
}

class Race {
    time;
    distanceRecord;

    constructor(time, distanceRecord) {
        this.time = time;
        this.distanceRecord = distanceRecord;
    }

    distanceByHolding(holdingTime) {
        return (this.time - holdingTime) * holdingTime;
    }

    isRecordBeatenByHolding(holdingTime) {
        return this.distanceByHolding(holdingTime) > this.distanceRecord;
    }

    getTimesToBeatRecord() {
        let lowerBound = Math.floor((this.time - Math.sqrt(Math.pow(this.time, 2) - 4 * this.distanceRecord)) / 2);
        lowerBound = Math.max(lowerBound, 0);

        let upperBound = Math.ceil((this.time + Math.sqrt(Math.pow(this.time, 2) - 4 * this.distanceRecord)) / 2);
        upperBound = Math.min(this.time, upperBound);

        return Math.abs(upperBound - lowerBound - 1);
    }
}

function getRacesFromDocument(racesDocument) {
    const [timeRow, distanceRow] = racesDocument.split("\n");
    const [timeLabel, ...times] = timeRow.split(/ +/);
    const [distanceLabel, ...distances] = distanceRow.split(/ +/);
    const result = [];
    for (const [time, distance] of zip(times, distances)) {
        result.push(new Race(+time, +distance));
    }
    return result;
}

function getRaceFromDocumentWithoutKerning(racesDocument) {
    const [timeRow, distanceRow] = racesDocument.split("\n");
    const [timeLabel, ...times] = timeRow.split(/ +/);
    const [distanceLabel, ...distances] = distanceRow.split(/ +/);
    const result = [];
    const timeString = times.join("");
    const distanceString = distances.join("");
    return new Race(+timeString, +distanceString);
}


module.exports = {
    getProductRecordBeat,
    getRacesFromDocument,
    getRaceFromDocumentWithoutKerning,
    getRecordBeatWithoutKerning,
}