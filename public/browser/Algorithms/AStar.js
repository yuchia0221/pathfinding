function AStar(start, target, boardTwoD, visitedList) {
    var priorityQueue = Array();
    var previousNode = null;
    set_dist(target, start, boardTwoD, priorityQueue);

    while (priorityQueue.length) {
        var currentNode = priorityQueue.shift();
        if (currentNode.status === "weighted") {
            currentNode.status = "visitedWeighted";
        } else {
            currentNode.status = "visited";
        }

        visitedList.push(currentNode);
        //previousNode = currentNode;
        AStar_util(target, currentNode, boardTwoD, priorityQueue);
        if (currentNode.location === target.location) {
            // console.log(visitedList);
            return true;
        }
    }
    return false;
}

function AStar_util(target, currentNode, boardTwoD, priorityQueue) {
    var boardHeight = boardTwoD.length;
    var boardWidth = boardTwoD[0].length;
    var targetChild = null;

    // right
    if (currentNode.column < boardWidth - 1) {
        targetChild = boardTwoD[currentNode.row][currentNode.column + 1];
        checkChild(target, targetChild, currentNode, priorityQueue);
    }

    // down
    if (currentNode.row < boardHeight - 1) {
        targetChild = boardTwoD[currentNode.row + 1][currentNode.column];
        checkChild(target, targetChild, currentNode, priorityQueue);
    }

    // left
    if (currentNode.column > 0) {
        targetChild = boardTwoD[currentNode.row][currentNode.column - 1];
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
        targetChild.totalDist +=
            dist(currentNode.row, currentNode.column, targetChild.row, targetChild.column) + currentNode.weight;
        let temp =
            currentNode.totalDist +
            dist(target.row, target.column, targetChild.row, targetChild.column) +
            targetChild.weight;

        targetChild.dist = temp;
        if (targetChild.father === null) {
            targetChild.father = currentNode;
        }


        // targetChild.father = currentNode;

        insert_to_queue(targetChild, priorityQueue);

    }
    if (targetChild.status === "visited") {
        targetChild.totalDist += currentNode.totalDist + 1 + currentNode.weight;
        let temp =
            currentNode.totalDist +
            dist(target.row, target.column, targetChild.row, targetChild.column) +
            targetChild.weight;
        targetChild.dist = temp;
        let targetIndex = priorityQueue.indexOf(priorityQueue.find(element => element.location === targetChild.location));
        priorityQueue.splice(targetIndex, 1);
        insert_to_queue(targetChild, priorityQueue);
    }
}
4356

function set_dist(target, start, boardTwoD, priorityQueue) {
    var boardHeight = boardTwoD.length;
    var boardWidth = boardTwoD[0].length;
    for (var i = 0; i < boardHeight; i++) {
        for (var j = 0; j < boardWidth; j++) {
            if (boardTwoD[i][j].location === start.location) {
                boardTwoD[i][j].dist = dist(start.row, start.column, target.row, target.column);
                insert_to_queue(boardTwoD[i][j], priorityQueue);
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
        priorityQueue.push(targetNode);
    }
}

function dist(ax, ay, bx, by) {
    return Math.abs(ax - bx) + Math.abs(ay - by);
    //return Math.sqrt(Math.pow((ax - bx), 2) + Math.pow((ay - by), 2));
}

export default AStar;