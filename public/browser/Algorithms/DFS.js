function dfs(start, target, boardTwoD, visitedList) {
    // Reach target
    if (start.location === target.location) {
        console.log("get Target");
        return target;
    }
    // Search other child
    setChild(start, boardTwoD, visitedList);
    //Find target in childList
    var checkTarget = start.child.find(function (item, index, array) {
        return item.location === target.location;
    });
    if (checkTarget != undefined) {
        return target;
    }

    for (var i = 0; i < start.child.length; i++) {
        var result = dfs(start.child[i], target, boardTwoD, visitedList);
        if (result != null) {
            return result;
        }
    }
    // No more child
    return null;
}

function setChild(current_node, boardTwoD, visitedList) {
    var boardHeight = boardTwoD.length;
    var boardWidth = boardTwoD[0].length;
    function changeStatus(row, column) {
        if (boardTwoD[row][column].status != "target") {
            boardTwoD[row][column].status = "visited";
        }
    }
    // right
    if (current_node.column < boardWidth - 1) {
        if (
            boardTwoD[current_node.row][current_node.column + 1].status === "unvisited" ||
            boardTwoD[current_node.row][current_node.column + 1].status === "target"
        ) {
            current_node.child.push(boardTwoD[current_node.row][current_node.column + 1]);
            visitedList.push(boardTwoD[current_node.row][current_node.column + 1]);
            changeStatus(current_node.row, current_node.column + 1);
            boardTwoD[current_node.row][current_node.column + 1].father = current_node;
        }
    }
    // up
    if (current_node.row > 0) {
        if (
            boardTwoD[current_node.row - 1][current_node.column].status === "unvisited" ||
            boardTwoD[current_node.row - 1][current_node.column].status === "target"
        ) {
            current_node.child.push(boardTwoD[current_node.row - 1][current_node.column]);
            visitedList.push(boardTwoD[current_node.row - 1][current_node.column]);
            changeStatus(current_node.row - 1, current_node.column);
            boardTwoD[current_node.row - 1][current_node.column].father = current_node;
        }
    }

    // down
    if (current_node.row < boardHeight - 1) {
        if (
            boardTwoD[current_node.row + 1][current_node.column].status === "unvisited" ||
            boardTwoD[current_node.row + 1][current_node.column].status === "target"
        ) {
            current_node.child.push(boardTwoD[current_node.row + 1][current_node.column]);
            visitedList.push(boardTwoD[current_node.row + 1][current_node.column]);
            changeStatus(current_node.row + 1, current_node.column);
            boardTwoD[current_node.row + 1][current_node.column].father = current_node;
        }
    }

    // left
    if (current_node.column > 0) {
        if (
            boardTwoD[current_node.row][current_node.column - 1].status === "unvisited" ||
            boardTwoD[current_node.row][current_node.column - 1].status === "target"
        ) {
            current_node.child.push(boardTwoD[current_node.row][current_node.column - 1]);
            visitedList.push(boardTwoD[current_node.row][current_node.column - 1]);
            changeStatus(current_node.row, current_node.column - 1);
            boardTwoD[current_node.row][current_node.column - 1].father = current_node;
        }
    }
    if ((current_node.status = "unvisited")) {
        current_node.status = "visited";
    }
}
export default dfs;
