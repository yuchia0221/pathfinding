import Node from "http://localhost:8000/public/browser/node.js";
import dfs from "http://localhost:8000/public/browser/Algorithms/DFS.js";
import bfs from "http://localhost:8000/public/browser/Algorithms/BFS.js";

function Board(height, width) {
    this.height = height; // Height of the board
    this.width = width; // Width of the board
    this.speed = "fast"; // The speed of running the path 'fast' 'normal' 'slow'
    this.start = new Node(Math.floor(this.height / 2), Math.floor(this.width / 4), "start", null); // Start point of the path
    this.target = new Node(Math.floor(this.height / 2), Math.floor((3 * this.width) / 4), "target", null); // Target of the path
    this.currentAlgorithms; // The Algorithm user choose
    this.wallNode = []; // Record the id of the wall node
    this.boardTwoD = [];
    this.path = [];
    this.visitedList = [];
    this.mousedown = false;
    this.draggingStart = false;
    this.draggingTarget = false;
    this.previousStatus = "";
    this.Drawing = false;
}

Board.prototype.initialize = function () {
    this.create_grid();
    this.add_event_listener();
    this.set_twoD_board();
};

Board.prototype.set_twoD_board = function () {
    // Only pushing node to the 2DboardArray
    this.boardTwoD = [];
    for (var i = 0; i < this.height; i++) {
        var temp_row = [];
        for (var j = 0; j < this.width; j++) {
            var node = new Node(i, j, this.find_node_class(i, j), null);
            temp_row.push(node);
        }
        this.boardTwoD.push(temp_row);
    }
};

Board.prototype.set_node = function (row, column, father) {
    var node = new Node(row, column, find_node_class(row, column), father, []);
    return node;
};

Board.prototype.create_grid = function () {
    let tableContent = "";
    // this.width = Math.floor(screen.width / 25);
    // this.height = Math.floor(screen.height / 20);
    for (var row = 0; row < this.height; row++) {
        let rowContent = `<tr id="row${row}">`;
        for (var column = 0; column < this.width; column++) {
            // Create table's html
            let nodeID = `${row}-${column}`;
            let nodeClass = this.find_node_class(row, column);
            if (nodeClass === "start" || nodeClass === "target") {
                rowContent += `<td id="${nodeID}" class="${nodeClass}"></td>`;
            } else {
                rowContent += `<td id="${nodeID}" class="${nodeClass}"></td>`;
            }
        }
        tableContent += `${rowContent}</tr>`;
    }
    let board = document.getElementById("board");
    board.innerHTML = tableContent;
};

Board.prototype.find_node_class = function (row, column) {
    if (row === Math.floor(this.height / 2) && column === Math.floor(this.width / 4)) {
        return "start";
    } else if (row === Math.floor(this.height / 2) && column === Math.floor((3 * this.width) / 4)) {
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
            currentNode.addEventListener("mousedown", (event) => {
                this.mousedown = true;
                if (currentNode.className === "start") {
                    this.draggingStart = true;
                } else if (currentNode.className === "target") {
                    this.draggingTarget = true;
                } else {
                    this.change_node_status(currentNode);
                }
            });
            currentNode.addEventListener("mouseover", (event) => {
                this.previousStatus = currentNode.className;
                if (this.draggingStart && this.mousedown) {
                    currentNode.className = "start";
                    this.boardTwoD[parseInt(currentNode.id.split("-")[0])][
                        parseInt(currentNode.id.split("-")[1])
                    ].status = "start";
                    this.start = this.boardTwoD[parseInt(currentNode.id.split("-")[0])][
                        parseInt(currentNode.id.split("-")[1])
                    ];
                } else if (this.draggingTarget && this.mousedown) {
                    currentNode.className = "target";
                    this.boardTwoD[parseInt(currentNode.id.split("-")[0])][
                        parseInt(currentNode.id.split("-")[1])
                    ].status = "target";
                    this.target = this.boardTwoD[parseInt(currentNode.id.split("-")[0])][
                        parseInt(currentNode.id.split("-")[1])
                    ];
                } else if (this.mousedown) {
                    this.change_node_status(currentNode);
                }
            });
            currentNode.addEventListener("mouseout", (event) => {
                if (this.draggingTarget || this.draggingStart) {
                    if (
                        (this.mousedown && this.previousStatus != "start" && this.draggingStart) ||
                        (this.previousStatus != "target" && this.draggingTarget)
                    ) {
                        currentNode.className = this.previousStatus;
                        this.boardTwoD[parseInt(currentNode.id.split("-")[0])][
                            parseInt(currentNode.id.split("-")[1])
                        ].status = this.previousStatus;
                    } else if (this.mousedown) {
                        currentNode.className = "unvisited";
                        this.boardTwoD[parseInt(currentNode.id.split("-")[0])][
                            parseInt(currentNode.id.split("-")[1])
                        ].status = "unvisited";
                    }
                }
            });
            currentNode.addEventListener("mouseup", (event) => {
                this.mousedown = false;
                this.draggingStart = false;
                this.draggingTarget = false;
            });
        }
    }

    let dfs_button = document.getElementById("startButtonDFS");
    dfs_button.addEventListener("click", (event) => {
        this.currentAlgorithms = "DFS";
    });
    let bfs_button = document.getElementById("startButtonBFS");
    bfs_button.addEventListener("click", (event) => {
        this.currentAlgorithms = "BFS";
    });
    let biDir_button = document.getElementById("startButtonBidirectional");
    biDir_button.addEventListener("click", (event) => {
        this.currentAlgorithms = "BFS";
    });
    let AStar_button = document.getElementById("startButtonAStar");
    bfs_button.addEventListener("click", (event) => {
        this.currentAlgorithms = "BFS";
    });
    let AStar2_button = document.getElementById("startButtonAStar2");
    AStar2_button.addEventListener("click", (event) => {
        this.currentAlgorithms = "BFS";
    });
    let AStar3_button = document.getElementById("startButtonAStar3");
    AStar3_button.addEventListener("click", (event) => {
        this.currentAlgorithms = "BFS";
    });
    let Greedy_button = document.getElementById("startButtonGreedy");
    Greedy_button.addEventListener("click", (event) => {
        this.currentAlgorithms = "BFS";
    });

    let driver_button = document.getElementById("driverButton");
    driver_button.addEventListener("click", (event) => {
        this.draw_short_path();
    });

    let adjustSpeed = document.getElementById("adjustspeed");
    console.log(adjustSpeed.textContent);


    let clearPath_button = document.getElementById("startButtonClearPath");
    clearPath_button.addEventListener("click", (event) => {
        if (this.Drawing === false) {
            this.clear_path();
        }
    });
};

Board.prototype.find_path = function () {
    if (this.currentAlgorithms === "DFS") {
        var result = dfs(this.start, this.target, this.boardTwoD, this.visitedList);
        // success
        if (result === true) {
            var currentNode = this.boardTwoD[this.target.row][this.target.column];
            while (currentNode.location != this.start.location) {
                let node = currentNode.father;
                this.path.unshift(node);
                currentNode = node;
            }
        }
    } else if (this.currentAlgorithms === "BFS") {
        bfs(this.start, this.target, this.boardTwoD, this.visitedList);
        var currentNode = this.boardTwoD[this.target.row][this.target.column];
        while (currentNode.location != this.start.location) {
            let node = currentNode.father;
            this.path.unshift(node);
            currentNode = node;
        }
    }
    return null;
};

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

Board.prototype.draw_visited_node = async function () {
    let userSpeed = document.getElementById("adjustspeed").textContent;
    let speed = 10;
    if (userSpeed === "Speed: Fast") {
        speed = 10;
    } else if (userSpeed === "Speed: Average") {
        speed = 50;
    } else if (userSpeed === "Speed: Slow") {
        speed = 100;
    }

    for (var i = 0; i < this.visitedList.length; i++) {
        await sleep(speed);
        if (document.getElementById(this.visitedList[i].location).className != "target" && document.getElementById(this.visitedList[i].location).className != "start") {
            document.getElementById(this.visitedList[i].location).className = "visited";
        }
    }
};

Board.prototype.draw_short_path = async function () {
    newBoard.find_path(this.currentAlgorithms);
    const result = await this.draw_visited_node();
    for (var i = 0; i < this.path.length; i++) {
        let currentNode = document.getElementById(this.path[i].location);
        if (currentNode.className === "visited") {
            await sleep(30);
            currentNode.className = "shortpath";
        }
    }
    this.Drawing = false;
};

Board.clear_path = function () {};

Board.prototype.clear_board = function () {
    this.boardTwoD.forEach((row) => {
        row.forEach((currentNode) => {
            let currentHTMLNode = document.getElementById(currentNode.location);
            if (currentNode.status === "wall") {
                currentNode.status = "unvisited";
                currentHTMLNode.className = "unvisited";
            }
        });
    });
};

Board.prototype.change_node_status = function (currentNode) {
    let status = currentNode.className;
    if (status === "unvisited") {
        currentNode.className = "wall";
        var currentNodeRow = parseInt(currentNode.id.split("-")[0]);
        var currentNodeColumn = parseInt(currentNode.id.split("-")[1]);
        this.boardTwoD[currentNodeRow][currentNodeColumn].status = "wall";
    } else if (status === "wall") {
        currentNode.className = "unvisited";
        var currentNodeRow = parseInt(currentNode.id.split("-")[0]);
        var currentNodeColumn = parseInt(currentNode.id.split("-")[1]);
        this.boardTwoD[currentNodeRow][currentNodeColumn].status = "unvisited";
    }
};

let height = Math.floor(screen.height / 40);
let width = Math.floor(screen.width / 25);
let newBoard = new Board(height, width);
newBoard.initialize();