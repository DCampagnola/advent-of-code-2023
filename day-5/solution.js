
function getLowestLocationFromSeeds(almanacString) {
    const almanac = Almanac.fromString(almanacString);
    let minDistance = null;
    for (const seed of almanac.seeds) {
        const location = almanac.getDistanceFromSeed(seed);
        if (!minDistance || location < minDistance) {
            minDistance = location;
        }
    }
    return minDistance;
}

function getLowestLocationFromRangeOfSeeds(almanacString) {
    const almanac = Almanac.fromString(almanacString);
    let minDistance = null;
    const remainingSeeds = almanac.seeds;
    const seedBlocks = [];
    while (remainingSeeds.length > 0) {
        const fromSeed = remainingSeeds.shift();
        const length = remainingSeeds.shift();
        seedBlocks.push([fromSeed, length]);
    }
    const distanceBlocks = almanac.getDistanceFromSeedBlock(seedBlocks);
    return distanceBlocks.sort(([a], [b]) => a-b)[0][0];
}

function isSource([source, dest, len], n) {
    return n >= source && n <= source + len - 1;
}

class AlmanacMap {
    constructor(map) {
        this.map = map;
    }

    map = [];

    static fromString(string) {
        const almanacMap = new AlmanacMap();
        const maps = string.split("\n")
            .map((s) => s.split(" "))
            .map(([dest, source, len]) => [+source, +dest, +len])
            .sort(([a], [b]) => a - b);
        almanacMap.map = maps;
        return almanacMap;
    }

    get(n) {
        let min = 0, max = this.map.length;
        while (min < max) {
            const mid = Math.floor((max - min) / 2) + min;
            const [source, dest, len] = this.map[mid];
            if (isSource(this.map[mid], n)) {
                return n - source + dest;
            } else if (n > source) {
                min = mid + 1;
            } else {
                max = mid;
            }
        }
        return n;
    }

    getBlocks(block) {
        let [start, blockLen] = block;
        const mappedBlocks = [];
        for (const [source, dest, len] of this.map) {
            if (start < source) {
                if (start + blockLen - 1 < source) {
                    break;
                } else {
                    const remainingLength = source - start;
                    mappedBlocks.push([
                        start,
                        remainingLength,
                    ]);
                    start = source;
                    blockLen = blockLen - remainingLength;
                }
            }
            if (start >= source && start < source + len) {
                const remainingLength = len - (start - source);
                if (remainingLength >= blockLen) {
                    mappedBlocks.push([
                        start - source + dest,
                        blockLen
                    ]);
                    blockLen = 0;
                    break;
                } else {
                    mappedBlocks.push([
                        start - source + dest,
                        remainingLength,
                    ]);
                    start = start + remainingLength;
                    blockLen = blockLen - remainingLength;
                }
            }
        }
        if (blockLen > 0) {
            mappedBlocks.push([
                start,
                blockLen
            ]);
        }
        return mappedBlocks;
    }
}

function getMap(almanac) {
    return almanac.substring(almanac.indexOf("\n") + 1);
}

class Almanac {
    seeds = [];
    seedToSoil;
    soilToFertilizer;
    fertilizerToWater;
    waterToLight;
    lightToTemperature;
    temperatureToHumidity;
    humidityToLocation;

    static fromString(string) {
        const almanac = new Almanac();
        const maps = string.split("\n\n")
        const seedsString = /seeds: ([\d+ ]+)/g.exec(maps[0])[1];
        const seedToSoilString = getMap(maps[1]);
        const soilToFertilizerString = getMap(maps[2]);
        const fertilizerToWaterString = getMap(maps[3]);
        const waterToLightString = getMap(maps[4]);
        const lightToTemperatureString = getMap(maps[5]);
        const temperatureToHumidityString = getMap(maps[6]);
        const humidityToLocationString = getMap(maps[7]);
        almanac.seeds = seedsString.split(" ").map(Number);
        almanac.seedToSoil = AlmanacMap.fromString(seedToSoilString);
        almanac.soilToFertilizer = AlmanacMap.fromString(soilToFertilizerString);
        almanac.fertilizerToWater = AlmanacMap.fromString(fertilizerToWaterString);
        almanac.waterToLight = AlmanacMap.fromString(waterToLightString);
        almanac.lightToTemperature = AlmanacMap.fromString(lightToTemperatureString);
        almanac.temperatureToHumidity = AlmanacMap.fromString(temperatureToHumidityString);
        almanac.humidityToLocation = AlmanacMap.fromString(humidityToLocationString);

        return almanac;
    }

    getDistanceFromSeed(seed) {
        const almanac = this;
        const soil = almanac.seedToSoil.get(seed);
        const fertilizer = almanac.soilToFertilizer.get(soil);
        const water = almanac.fertilizerToWater.get(fertilizer);
        const light = almanac.waterToLight.get(water);
        const temperature = almanac.lightToTemperature.get(light);
        const humidity = almanac.temperatureToHumidity.get(temperature);
        const location = almanac.humidityToLocation.get(humidity);
        return location;
    }
    getDistanceFromSeedBlock(blocks) {
        const almanac = this;
        const soilBlocks = blocks.map((b) => almanac.seedToSoil.getBlocks(b)).flat();
        const fertilizerBlocks = soilBlocks.map((b) => almanac.soilToFertilizer.getBlocks(b)).flat();
        const waterBlocks = fertilizerBlocks.map((b) => almanac.fertilizerToWater.getBlocks(b)).flat();
        const lightBlocks = waterBlocks.map((b) => almanac.waterToLight.getBlocks(b)).flat();
        const temperatureBlocks = lightBlocks.map((b) => almanac.lightToTemperature.getBlocks(b)).flat();
        const humidityBlocks = temperatureBlocks.map((b) => almanac.temperatureToHumidity.getBlocks(b)).flat();
        const locationBlocks = humidityBlocks.map((b) => almanac.humidityToLocation.getBlocks(b)).flat();
        return locationBlocks;
    }
}

module.exports = {
    getLowestLocationFromSeeds,
    Almanac,
    AlmanacMap,
    getLowestLocationFromRangeOfSeeds
}