function Board(height, width) {
    this.height = height; // Height of the board
    this.width = width; // Width of the board
    this.speed = "normal"; // The speed of running the path 'fast' 'normal' 'slow'
    this.start = null; // Start point of the path
    this.target = null; // Target of the path
    this.pathDirection = null; // The direction of the path
    this.currentAlgorithms; // The Algorithm user choose
    this.wallNode = []; // Record the id of the wall node
    this.boardTwoD = [];
}

Board.prototype.initialize = function () {
    this.create_grid();
    this.add_event_listener();
};

Board.prototype.create_grid = function () {
    let tableContent = "";
    for (var row = 0; row < this.height; row++) {
        let rowContent = `<tr id="row${row}">`;
        for (var column = 0; column < this.width; column++) {
            // Create table's html
            let nodeID = `${row}-${column}`;
            let nodeClass = this.find_node_class(row, column);
            rowContent += `<td id="${nodeID}" class="${nodeClass}"></td>`;
        }
        tableContent += `${rowContent}</tr>`;
    }
    let board = document.getElementById("board");
    board.innerHTML = tableContent;
};

Board.prototype.find_node_class = function (row, column) {
    if (
        row === Math.floor(this.height / 2) &&
        column === Math.floor(this.width / 4)
    ) {
        return "start";
    } else if (
        row === Math.floor(this.height / 2) &&
        column === Math.floor((3 * this.width) / 4)
    ) {
        return "target";
    } else {
        return "unvisited";
    }
};

Board.prototype.add_event_listener = function () {
    for (var row = 0; row < this.height; row++) {
        for (var column = 0; column < this.width; column++) {
            let nodeID = `${row}-${column}`;
            let currentNode = document.getElementById(nodeID);
            currentNode.addEventListener("click", (event) => {
                let status = currentNode.className;
                if (status === "unvisited") {
                    currentNode.className = "wall";
                } else if (status === "wall") {
                    currentNode.className = "unvisited";
                }
            });
        }
    }
};

Board.drawShortPath = function () {};

Board.drawVisitedNode = function () {};

Board.clearPath = function () {};

Board.clearBoard = function () {};

let width = 57;
let height = 24;
// let width = Math.floor(document.getElementById("board").offsetWidth / 25);
// let height = Math.floor(document.getElementById("board").offsetHeight / 20);
let newBoard = new Board(height, width);
newBoard.initialize();
