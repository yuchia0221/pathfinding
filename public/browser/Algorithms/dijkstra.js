function dijkstra(start, target, boardTwoD, visitedList) {
    var priorityQueue = Array(start);
    var previousNode = null;
    set_dist(start, boardTwoD, priorityQueue);

    while (priorityQueue.length) {
        var currentNode = priorityQueue.shift();
        if(currentNode.status === "weighted"){
            currentNode.status = "visitedWeighted";
        }else{
            currentNode.status = "visited";
        }

        console.log(currentNode);
        visitedList.push(currentNode);
        //previousNode = currentNode;
        dijkstra_util(currentNode, boardTwoD, priorityQueue);
        
        if (currentNode.location === target.location) {
            // boardTwoD[target.row][target.column].father = previousNode;
            // target.father = previousNode;
            console.log(visitedList);
            return true;
        }

    }
    return false;
}

function dijkstra_util(currentNode, boardTwoD, priorityQueue) {
    var boardHeight = boardTwoD.length;
    var boardWidth = boardTwoD[0].length;
    var targetChild = null;

    // left
    if (currentNode.column > 0) {
        targetChild = boardTwoD[currentNode.row][currentNode.column - 1];
        checkChild(targetChild, currentNode, priorityQueue);
    }

    // down
    if (currentNode.row < boardHeight - 1) {
        targetChild = boardTwoD[currentNode.row + 1][currentNode.column];
        checkChild(targetChild, currentNode, priorityQueue);
    }

    // right
    if (currentNode.column < boardWidth - 1) {
        targetChild = boardTwoD[currentNode.row][currentNode.column + 1];
        checkChild(targetChild, currentNode, priorityQueue);
    }
    // up
    if (currentNode.row > 0) {
        targetChild = boardTwoD[currentNode.row - 1][currentNode.column];
        checkChild(targetChild, currentNode, priorityQueue);
    }

    if ((currentNode.status = "unvisited")) {
        currentNode.status = "visited";
    }
}

function checkChild(targetChild, currentNode, priorityQueue) {
    if (targetChild.status === "unvisited" || targetChild.status === "target"|| targetChild.status === "weighted") {

        let temp = currentNode.dist + dist(currentNode.row, currentNode.column, targetChild.row, targetChild.column) + targetChild.weight;

        let targetIndex = priorityQueue.indexOf(priorityQueue.find(element => element.location === targetChild.location));
        priorityQueue.splice(targetIndex, 1);

        if (temp < targetChild.dist) {
            targetChild.dist = temp;
        }
        targetChild.father = currentNode;

        insert_to_queue(targetChild, priorityQueue);
    }
}

function set_dist(start, boardTwoD, priorityQueue) {
    var boardHeight = boardTwoD.length;
    var boardWidth = boardTwoD[0].length;
    for (var i = 0; i < boardHeight; i++) {
        for (var j = 0; j < boardWidth; j++) {
            if (boardTwoD[i][j].location === start.location) {
                boardTwoD[i][j].dist = 0;
            }
            boardTwoD[i][j].dist = Infinity;
            insert_to_queue(boardTwoD[i][j], priorityQueue);
        }
    }
}

function insert_to_queue(targetNode, priorityQueue) {
    if (priorityQueue.length === 0) {
        priorityQueue.push(targetNode);
    } else {
        for (var i = 0; i < priorityQueue.length; i++) {
            if (targetNode.dist < priorityQueue[i].dist) {
                priorityQueue.splice(i, 0, targetNode);
                return 0;
            }
        }
        priorityQueue.push(targetNode);
    }
}

function dist(ax, ay, bx, by) {
    return Math.abs(ax - bx) + Math.abs(ay - by);
    //return Math.sqrt(Math.pow((ax - bx), 2) + Math.pow((ay - by), 2));
}

export default dijkstra;