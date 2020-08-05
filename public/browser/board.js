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
    this.createGrid();
};

Board.prototype.createGrid = function () {
    let tableContent = "";
    for (var row = 0; row < this.height; row++) {
        let rowContent = `<tr id="row${row}">`;
        for (var column = 0; column < this.width; column++) {
            let nodeID = `${row}-${column}`;
            let nodeClass = "unvisited";
            rowContent += `<td id="${nodeID}" class="${nodeClass}"></td>`;
        }
        tableContent += `${rowContent}</tr>`;
    }
    let board = document.getElementById("board");
    board.innerHTML = tableContent;
    console.log(tableContent);
};

Board.drawShortPath = function () {};

Board.drawVisitedNode = function () {};

Board.clearPath = function () {};

Board.clearBoard = function () {};

let width = 20;
let height = 25;
// let width = Math.floor(document.getElementById("board").offsetWidth / 25);
// let height = Math.floor(document.getElementById("board").offsetHeight / 20);
console.log(width, height);
let newBoard = new Board(height, width);
newBoard.initialize();
