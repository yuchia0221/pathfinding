function dfs(start, target, boardTwoD, visitedList) {
    // Reach target
    if (start.location === target.location) {
        return target;
    }
    // Search other child
    setChild(start, boardTwoD, visitedList);
    for (var i = 0; i < start.child.length; i++) {
        var result = dfs(start.child[i], target, boardTwoD, visitedList);
        if (result != null) {
            return result;
        }
    }
    // No more child
    return null;
}

function setChild(currentNode, boardTwoD, visitedList) {
    var boardHeight = boardTwoD.length;
    var boardWidth = boardTwoD[0].length;
    var findIt = false;
    function changeStatus(row, column) {
        if (boardTwoD[row][column].status != "target") {
            boardTwoD[row][column].status = "visited";
        }
    }

    // right
    if (currentNode.column < boardWidth - 1) {
        if (
            boardTwoD[currentNode.row][currentNode.column + 1].status === "unvisited" ||
            boardTwoD[currentNode.row][currentNode.column + 1].status === "target"
        ) {
            findIt = true;
            currentNode.child.push(boardTwoD[currentNode.row][currentNode.column + 1]);
            visitedList.push(boardTwoD[currentNode.row][currentNode.column + 1]);
            changeStatus(currentNode.row, currentNode.column + 1);
            boardTwoD[currentNode.row][currentNode.column + 1].father = currentNode;
        }
    }
    // up
    if (currentNode.row > 0) {
        if (
            boardTwoD[currentNode.row - 1][currentNode.column].status === "unvisited" ||
            boardTwoD[currentNode.row - 1][currentNode.column].status === "target"
        ) {
            currentNode.child.push(boardTwoD[currentNode.row - 1][currentNode.column]);
            boardTwoD[currentNode.row - 1][currentNode.column].father = currentNode;
            if (!findIt) {
                visitedList.push(boardTwoD[currentNode.row - 1][currentNode.column]);
                changeStatus(currentNode.row - 1, currentNode.column);

                findIt = true;
            }
        }
    }

    // down
    if (currentNode.row < boardHeight - 1) {
        if (
            boardTwoD[currentNode.row + 1][currentNode.column].status === "unvisited" ||
            boardTwoD[currentNode.row + 1][currentNode.column].status === "target"
        ) {
            currentNode.child.push(boardTwoD[currentNode.row + 1][currentNode.column]);
            boardTwoD[currentNode.row + 1][currentNode.column].father = currentNode;
            if (!findIt) {
                visitedList.push(boardTwoD[currentNode.row + 1][currentNode.column]);
                changeStatus(currentNode.row + 1, currentNode.column);

                findIt = true;
            }
        }
    }

    // left
    if (currentNode.column > 0) {
        if (
            boardTwoD[currentNode.row][currentNode.column - 1].status === "unvisited" ||
            boardTwoD[currentNode.row][currentNode.column - 1].status === "target"
        ) {
            currentNode.child.push(boardTwoD[currentNode.row][currentNode.column - 1]);
            boardTwoD[currentNode.row][currentNode.column - 1].father = currentNode;
            if (!findIt) {
                visitedList.push(boardTwoD[currentNode.row][currentNode.column - 1]);
                changeStatus(currentNode.row, currentNode.column - 1);

                findIt = true;
            }
        }
    }
    if ((currentNode.status = "unvisited")) {
        currentNode.status = "visited";
    }
}
export default dfs;
