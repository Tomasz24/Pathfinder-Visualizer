
class GraphNode {
    constructor(name, weight=-1, idx=-1) {
        this.name = name;
        this.idx = idx;
        this.prev = -1;
        this.weight = weight;
    }
}


class Graph {
    constructor(name, n) {
        this.name = name;
        this.nodes = [];
        this.adjMtx = makeArray(n);
    }
}


function insertHeap(heap, node) {
    heap.push(node);
    let idx = heap.length - 1;
    swapUp(heap, idx);
}


function swapUp(heap, idx) {
    // base case
    if (idx == 0) return;
    let pIdx = Math.floor((idx - 1) / 2);   // right child gets rounded down
    // check if child has smaller weight
    if (heap[pIdx].weight > heap[idx].weight) {
        let temp = heap[pIdx];
        heap[pIdx] = heap[idx];
        heap[idx] = temp;
        swapUp(heap, pIdx);
    }
}


function removeHeap(heap) {
    let n = heap.length;
    if (n == 0) return;
    let node = heap[0];
    // move last node to the beginning
    heap[0] = heap[n - 1];
    heap.pop();     // remove the last element
    swapDown(heap, 0);
    // console.log(node.weight);
    return node;
}


function swapDown(heap, pIdx) {
    let lIdx = pIdx*2 + 1;      // left child
    let rIdx = lIdx + 1;        // right child
    let cIdx;                   // minimum child
    if (!(heap.length <= rIdx)) {           // check if rIdx is in heap
        cIdx = (heap[lIdx].weight < heap[rIdx].weight) ? lIdx : rIdx;
    } else if (!(heap.length <= lIdx)) {    // check if lIdx is in heap
        cIdx = lIdx;
    } else {                                // return if no children (base case)
        return;
    }
    // compare parent with minimum child
    if (heap[cIdx].weight < heap[pIdx].weight) {
        temp = heap[cIdx];
        heap[cIdx] = heap[pIdx];
        heap[pIdx] = temp;
        swapDown(heap, cIdx);
    }
}


function printHeap(heap) {
    let ans = "";
    let n = heap.length;
    if (n == 0) return;     // check if heap is empty
    let spaces = maxSpaces(n);
    ans = ans.concat(spaces);
    ans = ans.concat(String(heap[0].weight));
    ans = ans.concat("\n");
    newSpaces = spaceCalc(spaces, 1);      // input 1, since need to input index
    let tracker = 4;    // track when to move to the next line
    for (let i=1; i<n; i++) {
        ans = ans.concat(newSpaces + String(heap[i].weight));
        // determine when to insert newline
        if (tracker - 2 <= i) {         // tracker - 2 since let i=1
            tracker *= 2;
            // determine number of spaces needed before number
            newSpaces = spaceCalc(spaces, i + 1);  // change space amount when changing depth
            ans = ans.concat("\n");
        }
    }
    console.log(ans);
}


function spaceCalc(spaces, idx) {
    let spaceLen = spaces.length;
    let depth = Math.floor(Math.log(idx + 1) / Math.log(2)); // idx + 1 to compare position, not index
    let gapNum = Math.pow(2, depth) + 1;            // number of space gaps on each level
    spaceLen = Math.floor(spaceLen * 2 / gapNum);    // need to multiply by 2 first
    ans = "";
    for (let i=0; i<spaceLen; i++) {
        ans = ans.concat(" ");
    }
    return ans;
}


function maxSpaces(n) {
    let depth = Math.floor(Math.log(n) / Math.log(2));
    // number of spaces
    let spaceNum = Math.pow(2, depth);
    let ans = "";
    for (let i=0; i<spaceNum; i++) {
        ans = ans.concat(" ");
    }
    return ans;
}


function heapTest(heap, graph) {
    let n = 9;
    for (let i=0; i<n; i++) {
        let node = new GraphNode("n".concat(String(i)), i);
        insertHeap(heap, node);
        addNode(graph, node)
    }
    for (let i=0; i<n; i++) {
        let node = new GraphNode("m".concat(String(i)), i);
        insertHeap(heap, node);
        addNode(graph, node)
    } 
}


function userInsertHeap(graph, heap, id) {
    let nodeName = document.getElementById(id).value;
    let n = graph.nodes.length;
    // find node in graph with name in text-field
    for (let i=0; i<n; i++) {
        if (nodeName == graph.nodes[i].name) {
            insertHeap(heap, graph.nodes[i]);
        }
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
function inputGraphNode(nameId, weightId) {
    let name = document.getElementById(nameId).value;
    let weight = document.getElementById(weightId).value;
    if (weight == "") {
        gNode = new GraphNode(name);
    } else {
        gNode = new GraphNode(name, weight);
    }
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


function addEdge(idx1, idx2, edgeWeight) {
    // modify adjMtx
    myGraph.adjMtx[idx1][idx2] = edgeWeight;
    myGraph.adjMtx[idx2][idx1] = edgeWeight;
}


function userAddEdge(id1, id2, idW) {
    // get names of nodes
    let nodeName1 = document.getElementById(id1).value;
    let nodeName2 = document.getElementById(id2).value;
    // get edge weight
    let edgeWeight = Number(document.getElementById(idW).value);
    // get number of nodes
    let n = myGraph.nodes.length;
    // declare idices so accessible throughout the function
    let idx1 = -1;
    let idx2 = -1;

    // go through and find nodes in myGraph
    for (let i=0; i<n; i++) {
        // check if node1
        if (myGraph.nodes[i].name == nodeName1) {
            idx1 = myGraph.nodes[i].idx;
        }
        // check if node2
        if (myGraph.nodes[i].name == nodeName2) {
            idx2 = myGraph.nodes[i].idx;
        }
        // break out if nodes have been found
        if (idx1 != -1 && idx2 != -1) break;
    }

    addEdge(idx1, idx2, edgeWeight);
}


function adjMtxTest() {
    printArray(myGraph.adjMtx);
}


function resetGraph(graph) {
    let n = graph.nodes.length
    for (let i=0; i<n; i++) {
        graph.nodes[i].prev = -1;
        graph.nodes[i].weight = -1;
    }
}


function dijkstrasAlgo(graph, startIdx, endIdx) {
    // current index
    let curIdx = startIdx;
    // initialize heap
    let heap = [];
    // better to use idx here instead of node :(
    insertHeap(heap, graph.nodes[startIdx]);
    // give start node a weight of 0
    graph.nodes[startIdx].weight = 0;

    // while queue not empty and endIdx not found
    while (heap.length!=0 && curIdx!=endIdx) {
        // take from the queue
        curIdx = removeHeap(heap).idx;          // should change to indices :(

        let n = graph.nodes.length;
        // add edges to queue
        for (let i=0; i<n; i++) {
            // add to queue if unvisited (0) or edge is lower than node weight
            if (graph.adjMtx[curIdx][i] != 0) {
                // weight of new node from previous edge
                let newWeight = graph.adjMtx[curIdx][i] + graph.nodes[curIdx].weight;
                if (graph.nodes[i].weight == -1 || newWeight < graph.nodes[i].weight) {
                    // if unexplored (weight = -1) or new path is quicker, add edge 
                    // weight to previous weight
                    graph.nodes[i].weight = newWeight;
                    // set previous node to back track later
                    graph.nodes[i].prev = curIdx;
                    // add to priorith queue
                    insertHeap(heap, graph.nodes[i])  // should change to indices :(
                }
            }

        }
    }
    // empty the queue if anything is left
    while (heap.length != 0) {
        removeHeap(heap);
    }
    // if path found
    if (curIdx == endIdx) {
        console.log("Path found between " + graph.nodes[startIdx].name + " and " +
            graph.nodes[endIdx].name + " found!");
        // print path backwards
        while (curIdx != startIdx) {
            console.log(graph.nodes[curIdx].name);
            curIdx = graph.nodes[curIdx].prev;
        }
        console.log(graph.nodes[curIdx].name);
    } 
    // else path not found
    else {
        console.log("Path found between " + graph.nodes[startIdx].name + " and " +
            graph.nodes[endIdx].name + " not found!");
    }
    // reset graph by updating previous nodes and weights to -1
    resetGraph(graph);
}


function userDijkstrasAlgo(graph, id1, id2) {
    let startName = document.getElementById(id1).value;
    let endName = document.getElementById(id2).value;
    let n = graph.nodes.length;
    let startIdx = -1;
    let endIdx = -1;
    // match names to indices
    for (let i=0; i<n; i++) {
        if (graph.nodes[i].name == startName) {
            startIdx = graph.nodes[i].idx;
        } else if (graph.nodes[i].name == endName) {
            endIdx = graph.nodes[i].idx;
        }
        if (startIdx != -1 && endIdx != -1) break;
    }
    // check if found nodes
    if (startIdx == -1 || endIdx == -1) {
        console.log("One or both nodes not found");
        return;
    }
    dijkstrasAlgo(graph, startIdx, endIdx);
}


function dijstrasTestGraph1(graph) {
    let n = 6;
    for (let i=0; i<n; i++) {
        let node = new GraphNode("n".concat(String(i)));
        addNode(graph, node);
    }
    // outside edges
    addEdge(0, 1, 2);
    addEdge(1, 2, 5);
    addEdge(2, 3, 6);
    addEdge(3, 4, 4);
    addEdge(4, 5, 2);
    // inside edges
    addEdge(0, 4, 2);
    addEdge(1, 4, 6);
    addEdge(2, 4, 1);
}



////////////////////////////////////////////////////

// main code

let myGraph = new Graph("myGraph", 0);

let myHeap = [];

