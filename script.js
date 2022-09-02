
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
    let n = graph.nodes.length;     // number of nodes
    node.idx = n - 1;               // since indexing starts at 0

    // update adjacency matrix
    array = [0];
    for (let i=0; i<n-1; i++) {  // n - 1 since the last array is added separately
        graph.adjMtx[i].push(0);
        array.push(0);
    }
    graph.adjMtx.push(array);
}


function removeNode(graph, node) {
    // number of nodes
    let n = graph.nodes.length;
    let idx = 0;
    // find node and delete from array
    for (let i=0; i<n; i++) {
        if (graph.nodes[i].name == node) {
            // emulate python .extend()
            graph.nodes = extend(graph.nodes.slice(0, i), graph.nodes.slice(i + 1));
            // initialize idx
            idx = i;
            break;
        }
    }

    // update adjacency matrix
    for (let i=0; i<n; i++) {
        // remove idx-th entry from non-idx nodes
        graph.adjMtx[i] = extend(graph.adjMtx[i].slice(0, idx), graph.adjMtx[i].slice(idx + 1));
    }
    // remove idx-th array
    graph.adjMtx = extend(graph.adjMtx.slice(0, idx), graph.adjMtx.slice(idx + 1));

    // shift down idx
    for (let i=0; i<n - 1; i++) {       // n - 1 since now the matrix is smaller
        if (graph.nodes[i].idx > idx) {
            graph.nodes[i].idx--;
        }
    }
}


// call by button
function inputGraphNode(id) {
    gNode = new GraphNode(document.getElementById(id).value);
    addNode(myGraph, gNode);
}


// call by button
function userRemoveNode(id) {
    gNode = document.getElementById(id).value;
    removeNode(myGraph, gNode);
}


function printNodes() {
    let n = myGraph.nodes.length
    for (let i=0; i<n; i++) {
        console.log(myGraph.nodes[i])
    }
}


function extend(a1, a2) {
    let n = a2.length;
    for (let i=0; i<n; i++) {
        a1.push(a2[i]);
    }
    return a1;
}


function addEdge(id1, id2) {
    // get names of nodes
    let nodeName1 = document.getElementById(id1).value;
    let nodeName2 = document.getElementById(id2).value;
    // get number of nodes
    let n = myGraph.nodes.length;
    // declare nodes so accessible throughout the function
    let node1 = null;
    let node2 = null;

    // go through and find nodes in myGraph
    for (let i=0; i<n; i++) {
        // check if node1
        if (myGraph.nodes[i].name == nodeName1) {
            node1 = myGraph.nodes[i];
        }
        // check if node2
        if (myGraph.nodes[i].name == nodeName2) {
            node2 = myGraph.nodes[i];
        }
        // break out if nodes have been found
        if (node1 && node2) break;
    }

    // modify adjMtx
    myGraph.adjMtx[node1.idx][node2.idx] = 1;
    myGraph.adjMtx[node2.idx][node1.idx] = 1;
}


function adjMtxTest() {
    printArray(myGraph.adjMtx);
}


////////////////////////////////////////////////////

// main code

let myGraph = new Graph("myGraph", 0);



