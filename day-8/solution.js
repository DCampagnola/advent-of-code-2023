
function getStepsToZZZ(networkTable) {
    const {directions, startingNode: node} = parseNetworkTable(networkTable);
    let directionIndex = 0;
    let steps = 0;
    while(node.name !== "ZZZ") {
        if (directions[directionIndex] == Direction.LEFT) {
            node.goLeft();
        } else {
            node.goRight();
        }
        directionIndex = (directionIndex + 1) % directions.length;
        steps++;
    }
    return steps;
}

function getStepsToEndingZ(directions, network) {
    let directionIndex = 0;
    let steps = 0;
    while(!network.name.endsWith("Z")) {
        if (directions[directionIndex] == Direction.LEFT) {
            network.goLeft();
        } else {
            network.goRight();
        }
        directionIndex = (directionIndex + 1) % directions.length;
        steps++;
    }
    return steps;
}

function getSimulaneouslyToEndingZ(networkTable) {
    const {directions, nodeTable} = parseNetworkTable(networkTable);
    const nodesEndingWithA = Object.keys(nodeTable).filter((a) => a.endsWith("A"));
    const networks = [];
    for(const node of nodesEndingWithA) {
        networks.push(new Network(nodeTable, node));
    }
    const steps = [];
    for (const network of networks) {
        steps.push(getStepsToEndingZ(directions, network));
    }
    return lcm(...steps);

}

// Never thought about it
const lcm = (...arr) => {
    const gcd = (x, y) => (!y ? x : gcd(y, x % y));
    const _lcm = (x, y) => (x * y) / gcd(x, y);
    return [...arr].reduce((a, b) => _lcm(a, b));
  };  

function parseNetworkTable(networkTable) {
    const [directionsString, networkString] = networkTable.split("\n\n");
    const nodeTable = {};
    for (const row of networkString.split("\n")) {
        const [source, destinations] = row.split(" = ");
        const [left, right] = destinations.substring(1, destinations.length - 1).split(", ");
        nodeTable[source] = new Node(source, left, right);
    }
    const directions = [];
    for (const directionString of directionsString.split("")) {
        if(directionString === 'L') {
            directions.push(Direction.LEFT);
        } else {
            directions.push(Direction.RIGHT);
        }
    }
    return {
        directions,
        startingNode: new Network(nodeTable),
        nodeTable
    };
}

class Network {
    nodeTable;
    currentNode;

    constructor(nodeTable, startingNode = "AAA") {
        this.nodeTable = nodeTable;
        this.currentNode = nodeTable[startingNode];
    }

    goLeft() {
        const node = this.nodeTable[this.currentNode.left];
        this.currentNode = node;
        return this;
    }

    goRight() {
        const node = this.nodeTable[this.currentNode.right];
        this.currentNode = node;
        return this;
    }

    get name() {
        return this.currentNode.name;
    }
}

class Node {
    name;
    left;
    right;

    constructor(name, left, right) {
        this.name = name;
        this.left = left;
        this.right = right;
    }
}

const Direction = {
    LEFT: 0,
    RIGHT: 1
};

module.exports = {
    getStepsToZZZ,
    parseNetworkTable,
    Direction,
    getSimulaneouslyToEndingZ
}

