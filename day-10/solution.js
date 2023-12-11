function maxStepsFromStart(pipeMap) {
    const {
        pipeMap: map,
        startingCoordinates
    } = parseInput(pipeMap);
    let minSteps = null
    for (const pipe of Object.values(Pipe)) {
        const res = countLoopingWithStartingPipe(map, startingCoordinates, pipe);
        if (res) {
            if (!minSteps || minSteps > res) {
                minSteps = res;
            }
        }
    }
    return minSteps / 2;
}

function countLoopingWithStartingPipe(pipeMap, startingCoordinates, pipe) {
    let [x, y] = startingCoordinates;
    let currentPipe = pipe;
    let currentDirectiton;
    if (pipe == Pipe.HORIZONTAL || pipe == Pipe.SOUTH_EST) {
        currentDirectiton = Direction.LEFT;
    } else {
        currentDirectiton = Direction.UP;
    }
    let steps = 0;
    do {
        const nextCoordinates = getNextCoordinates([x, y], currentPipe, currentDirectiton);
        if (!nextCoordinates) return null;
        [[x, y], currentDirectiton] = nextCoordinates;
        currentPipe = pipeMap[x][y];
        steps++;
    } while (currentPipe != Pipe.STARTING_ANIMAL)
    return steps;
}

function getNextCoordinates([x, y], pipe, direction) {
    switch (pipe) {
        case Pipe.HORIZONTAL:
            if (direction == Direction.RIGHT) {
                return [[x, y + 1], direction]
            } else if (direction == Direction.LEFT) {
                return [[x, y - 1], direction]
            }
            break;
        case Pipe.VERTICAL:
            if (direction == Direction.UP) {
                return [[x - 1, y], direction]
            } else if (direction == Direction.DOWN) {
                return [[x + 1, y], direction]
            }
            break;
        case Pipe.NORTH_EAST:
            if (direction == Direction.DOWN) {
                return [[x, y + 1], Direction.RIGHT]
            } else if (direction == Direction.LEFT) {
                return [[x - 1, y], Direction.UP]
            }
            break;
        case Pipe.NORTH_WEST:
            if (direction == Direction.DOWN) {
                return [[x, y - 1], Direction.LEFT]
            } else if (direction == Direction.RIGHT) {
                return [[x - 1, y], Direction.UP]
            }
            break;
        case Pipe.SOUTH_EST:
            if (direction == Direction.UP) {
                return [[x, y + 1], Direction.RIGHT]
            } else if (direction == Direction.LEFT) {
                return [[x + 1, y], Direction.DOWN]
            }
            break;
        case Pipe.SOUTH_WEST:
            if (direction == Direction.UP) {
                return [[x, y - 1], Direction.LEFT]
            } else if (direction == Direction.RIGHT) {
                return [[x + 1, y], Direction.DOWN]
            }
            break;
            return null;
    }
}

function setStartingPipe(pipeMap, startingCoordinates) {
    for (const pipe of Object.values(Pipe)) {
        const res = countLoopingWithStartingPipe(pipeMap, startingCoordinates, pipe);
        if (res) {
            const [i, j] = startingCoordinates;
            pipeMap[i][j] = pipe;
            return;
        }
    }
    throw new Error("No loop");
}

function parseInput(pipeMap) {
    const map = pipeMap.split("\n").map((s) => s.split(""));
    for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map[x].length; y++) {
            if (map[x][y] == Pipe.STARTING_ANIMAL) {
                return {
                    startingCoordinates: [x, y],
                    pipeMap: map
                };
            }
        }
    }
    throw new Error("Starting animal not found!")
}

function countInnerArea(pipeMapString) {
    const {
        pipeMap,
        startingCoordinates
    } = parseInput(pipeMapString);
    setStartingPipe(pipeMap, startingCoordinates);
    let innerArea = 0;
    for (let i = 0; i < pipeMap.length; i++) {
        for (let j = 0; j < pipeMap[i].length; j++) {
            if (pipeMap[i][j] != ".") continue;
            let walls = 0;
            for (let w = 0; w < i; w++) {
                if (pipeMap[w][j] != Pipe.VERTICAL &&
                    pipeMap[w][j] != Pipe.GROUND &&
                    pipeMap[w][j] != Pipe.INNER_GROUND) {
                    walls++;
                }
            }
            if (walls % 2 == 1) {
                innerArea++;
                pipeMap[i][j] = Pipe.INNER_GROUND;
            }
        }
    }
    console.log(pipeMap.map((a) => a.map((c) => c == '.' ? " " : c).join("")).join("\n"));
    return innerArea;
}

const Direction = {
    UP: "up",
    DOWN: "down",
    LEFT: "left",
    RIGHT: "right",
};

const Pipe = {
    VERTICAL: "|",
    HORIZONTAL: "-",
    NORTH_EAST: "L",
    NORTH_WEST: "J",
    SOUTH_WEST: "7",
    SOUTH_EST: "F",
    GROUND: ".",
    STARTING_ANIMAL: "S",
    INNER_GROUND: "I"
};

module.exports = {
    maxStepsFromStart,
    parseInput,
    countLoopingWithStartingPipe,
    getNextCoordinates,
    countInnerArea,
    Direction,
    Pipe
}