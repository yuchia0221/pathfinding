function dfs(start, target, boardTwoD, visitedList) {
    console.log(1);
    var nodeToVisit = [];
    nodeToVisit.push(start);
    var previousNode = start;
    var currentNode = null;

    while (nodeToVisit.length > 0) {
        currentNode = nodeToVisit.pop();

        if (currentNode.status === "target") {
            boardTwoD[target.row][target.column].father = previousNode;
            target.father = previousNode;
            return true;
        }

        visitedList.push(currentNode);
        currentNode.status = "visited";
        previousNode = currentNode;
        setChild(currentNode, boardTwoD, nodeToVisit);
    }
    return false;
}

function setChild(currentNode, boardTwoD, nodeToVisit) {
    var boardHeight = boardTwoD.length;
    var boardWidth = boardTwoD[0].length;
    var targetChild = null;

    // left
    if (currentNode.column > 0) {
        targetChild = boardTwoD[currentNode.row][currentNode.column - 1];
        checkChild(targetChild, nodeToVisit, currentNode);
    }

    // down
    if (currentNode.row < boardHeight - 1) {
        targetChild = boardTwoD[currentNode.row + 1][currentNode.column];
        checkChild(targetChild, nodeToVisit, currentNode);
    }

    // right
    if (currentNode.column < boardWidth - 1) {
        targetChild = boardTwoD[currentNode.row][currentNode.column + 1];
        checkChild(targetChild, nodeToVisit, currentNode);
    }
    // up
    if (currentNode.row > 0) {
        targetChild = boardTwoD[currentNode.row - 1][currentNode.column];
        checkChild(targetChild, nodeToVisit, currentNode);
    }
}

function checkChild(targetChild, nodeToVisit, currentNode) {
    if (targetChild.status === "unvisited" || targetChild.status === "target") {

        targetChild.father = currentNode;
        nodeToVisit.push(targetChild);
    }
}

export default dfs;
