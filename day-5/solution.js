
function getLowestLocationFromSeeds(almanacString) {
    const almanac = Almanac.fromString(almanacString);
    let minDistance = null;
    for(const seed of almanac.seeds) {
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
    while(remainingSeeds.length > 0) {
        const fromSeed = remainingSeeds.shift();
        const length = remainingSeeds.shift();
        seedBlocks.push([fromSeed, length]);
    }
    return almanac.getDistanceFromSeedBlock(seedBlocks);
    return minDistance;
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
            .map(([dest, source, len]) => [+source,+dest,+len])
            .sort(([a], [b]) => a-b);
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

    getBlocks(blocks) {
        const mappedBlocks = [];
        blocks = blocks.sort(([a], [b]) => a-b);
        for (let [start, blockLen] of blocks) {
            let m = this.map.shift();
            let skip = false;
            while (m && !isSource(m, start)) {
                if (m[0] >= start && m[0] <= start + blockLen) {
                    blocks.unshift(
                        [start, m[0] - start],
                        [m[0], blockLen - m[0]]
                    );
                    skip = true;
                    break;
                }
                if (m[0] >= start + blockLen) {
                    this.map.unshift(m);
                    skip = true;
                    break;
                } else {
                    m = this.map.shift();
                }
            }
            if (skip) continue;
            if (m) {
                const [source, dest, len] = m;
                const remainingLength = blockLen - len;
                if (remainingLength > 0) {
                    blocks.unshift([source + len, remainingLength]);
                }
                const mappedDest = start - source + dest;
                mappedBlocks.push([mappedDest, Math.min(blockLen, len)]);
            } else {
                mappedBlocks.push([start, blockLen]);
            }
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
        const soil = almanac.seedToSoil.getBlocks(blocks);
        const fertilizer = almanac.soilToFertilizer.getBlocks(soil);
        const water = almanac.fertilizerToWater.getBlocks(fertilizer);
        const light = almanac.waterToLight.getBlocks(water);
        const temperature = almanac.lightToTemperature.getBlocks(light);
        const humidity = almanac.temperatureToHumidity.getBlocks(temperature);
        const location = almanac.humidityToLocation.getBlocks(humidity);
        return location;
    }
}

module.exports = {
    getLowestLocationFromSeeds,
    Almanac,
    AlmanacMap,
    getLowestLocationFromRangeOfSeeds
}