function greedy(start, target, boardTwoD, visitedList) {
    var priorityQueue = Array();
    var previousNode = null;
    set_dist(target, start, boardTwoD, priorityQueue);
    start = boardTwoD[start.row][start.column];
    insert_to_queue(start, priorityQueue);

    while (priorityQueue.length) {
        var currentNode = priorityQueue.shift();

        if (currentNode.status === "weighted") {
            currentNode.status = "visitedWeighted";
        } else {
            currentNode.status = "visited";
        }

        visitedList.push(currentNode);

        if (currentNode.location === target.location) {
            return true;
        }
        greedy_util(target, currentNode, boardTwoD, priorityQueue);

    }
    return false;
}

function greedy_util(target, currentNode, boardTwoD, priorityQueue) {

    var boardHeight = boardTwoD.length;
    var boardWidth = boardTwoD[0].length;
    var targetChild = null;

    // left
    if (currentNode.column > 0) {
        targetChild = boardTwoD[currentNode.row][currentNode.column - 1];
        checkChild(target, targetChild, currentNode, priorityQueue);
    }

    // down
    if (currentNode.row < boardHeight - 1) {
        targetChild = boardTwoD[currentNode.row + 1][currentNode.column];
        checkChild(target, targetChild, currentNode, priorityQueue);
    }

    // right
    if (currentNode.column < boardWidth - 1) {
        targetChild = boardTwoD[currentNode.row][currentNode.column + 1];
        checkChild(target, targetChild, currentNode, priorityQueue);
    }
    // up
    if (currentNode.row > 0) {
        targetChild = boardTwoD[currentNode.row - 1][currentNode.column];
        checkChild(target, targetChild, currentNode, priorityQueue);
    }

    if ((currentNode.status = "unvisited")) {
        currentNode.status = "visited";
    }

}

function checkChild(target, targetChild, currentNode, priorityQueue) {
    if (targetChild.status === "unvisited" || targetChild.status === "target" || targetChild.status === "weighted") {

        let temp = dist(target.row, target.column, targetChild.row, targetChild.column) + targetChild.weight;

        // let targetIndex = priorityQueue.indexOf(priorityQueue.find(element => element.location === targetChild.location));
        // priorityQueue.splice(targetIndex, 1);

        targetChild.dist = temp;
        targetChild.father = currentNode;
        insert_to_queue(targetChild, priorityQueue);
    }
}

function set_dist(target, start, boardTwoD, priorityQueue) {
    var boardHeight = boardTwoD.length;
    var boardWidth = boardTwoD[0].length;
    for (var i = 0; i < boardHeight; i++) {
        for (var j = 0; j < boardWidth; j++) {
            if (boardTwoD[i][j].location === start.location) {
                boardTwoD[i][j].dist = dist(start.row, start.column, target.row, target.column);
            }
            boardTwoD[i][j].dist = Infinity;
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
    }
}

function dist(ax, ay, bx, by) {
    return Math.abs(ax - bx) + Math.abs(ay - by);
}

export default greedy;