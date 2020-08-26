function bfs(start, target, board, visitedList) {
    var queue = Array(start);
    while (queue && queue.length) {
        var currentNode = queue.shift();
        currentNode.status = "visited";
        var neighbors = bfs_util(currentNode, board);
        for (var i = 0; i < neighbors.length; i++) {
            queue.push(neighbors[i]);
            visitedList.push(neighbors[i]);
            if (neighbors[i].location === target.location) {
                return true;
            }
        }
    }
    return false;
}

function bfs_util(node, board) {
    var boardHeight = board.length;
    var boardWidth = board[0].length;
    var findIt = false;
    var tempt = Array();
    function changeStatus(row, column) {
        if (board[row][column].status != "target") {
            board[row][column].status = "visited";
        }
    }

    // right
    if (node.column < boardWidth - 1) {
        if (
            board[node.row][node.column + 1].status === "unvisited" ||
            board[node.row][node.column + 1].status === "target"
        ) {
            findIt = true;
            node.child.push(board[node.row][node.column + 1]);
            changeStatus(node.row, node.column + 1);
            board[node.row][node.column + 1].father = node;
            tempt.push(board[node.row][node.column + 1]);
        }
    }

    // up
    if (node.row > 0) {
        if (
            board[node.row - 1][node.column].status === "unvisited" ||
            board[node.row - 1][node.column].status === "target"
        ) {
            node.child.push(board[node.row - 1][node.column]);
            board[node.row - 1][node.column].father = node;
            if (!findIt) {
                changeStatus(node.row - 1, node.column);

                findIt = true;
            }
            tempt.push(board[node.row - 1][node.column]);
        }
    }

    // down
    if (node.row < boardHeight - 1) {
        if (
            board[node.row + 1][node.column].status === "unvisited" ||
            board[node.row + 1][node.column].status === "target"
        ) {
            node.child.push(board[node.row + 1][node.column]);
            board[node.row + 1][node.column].father = node;
            if (!findIt) {
                changeStatus(node.row + 1, node.column);

                findIt = true;
            }
            tempt.push(board[node.row + 1][node.column]);
        }
    }

    // left
    if (node.column > 0) {
        if (
            board[node.row][node.column - 1].status === "unvisited" ||
            board[node.row][node.column - 1].status === "target"
        ) {
            node.child.push(board[node.row][node.column - 1]);
            board[node.row][node.column - 1].father = node;
            if (!findIt) {
                changeStatus(node.row, node.column - 1);

                findIt = true;
            }
            tempt.push(board[node.row][node.column - 1]);
        }
    }

    if ((node.status = "unvisited")) {
        node.status = "visited";
    }
    return tempt;
}
export default bfs;
