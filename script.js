
class GraphNode {
    constructor(name, idx=-1) {
        this.name = name;
        this.idx = idx;
        this.prev = null;
        this.explored = 0;
    }
}


class QNode {
    constructor(cargo) {
        this.cargo = cargo;
        this.next = null;
    }
}


class Queue {
    constructor() {
        this.top = null;
        this.numEl = 0;
    }
}


class Graph {
    constructor(name, n) {
        this.name = name;
        this.nodes = [];
        this.adjMtx = makeArray(n);
    }
}


function makeArray(n) {
    let a1 = [];
    let a2 = [];
    for (let i=0; i<n; i++) {
        a1.push(0);
    }
    for (let i=0; i<n; i++) {
        a2.push(a1.slice());
    }
    return a2;
}


function printArray(a) {
    let n = a.length;
    let str = "";
    for (let i=0; i<n; i++) {
        for (let j=0; j<n; j++) {
            str = str.concat(String(a[i][j]) + " ");
        }
        str = str.concat("\n");
    }
    console.log(str);
}


function arrayTest(id) {
    let n = Number(document.getElementById(id).value);
    let a = makeArray(n);
    printArray(a);
}


function addNode(graph, node) {
    // update node array
    graph.nodes.push(node);
    let n = graph.nodes.length;  // number of nodes
    node.idx = n;

    // update adjacency matrix
    array = [0];
    for (let i=0; i<n-1; i++) {  // n - 1 since the last array is added separately
        graph.adjMtx[i].push(0);
        array.push(0);
    }
    graph.adjMtx.push(array);
}


function inputGraphNode(id) {
    gNode = new GraphNode(document.getElementById(id).value);
    addNode(myGraph, gNode);
}


function printNodes() {
    let n = myGraph.nodes.length
    for (let i=0; i<n; i++) {
        console.log(myGraph.nodes[i])
    }
}


////////////////////////////////////////////////////

// main code

let myGraph = new Graph("myGraph", 0);



