//const Node = require("./node");
// const dfs = require("http://localhost:8000/public/browser/Algorithms/DFS.js");
import Node from "http://localhost:8000/public/browser/node.js";
import dfs from "http://localhost:8000/public/browser/Algorithms/DFS.js";

function Board(height, width) {
	this.height = height; // Height of the board
	this.width = width; // Width of the board
	this.speed = "normal"; // The speed of running the path 'fast' 'normal' 'slow'
	this.start = new Node(
		Math.floor(this.height / 2),
		Math.floor(this.width / 4),
		"start",
		null
	); // Start point of the path
	this.target = new Node(
		Math.floor(this.height / 2),
		Math.floor((3 * this.width) / 4),
		"target",
		null
	); // Target of the path
	this.pathDirection = null; // The direction of the path
	this.currentAlgorithms; // The Algorithm user choose
	this.wallNode = []; // Record the id of the wall node
	this.boardTwoD = [];
	this.path = [];
	this.visitedList = [];
}

Board.prototype.initialize = function () {
	this.create_grid();
	this.add_event_listener();
	this.set_twoD_board();
};

Board.prototype.set_twoD_board = function () {
	//Only pushing node to the 2DboardArray
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

					var currentNodeRow = parseInt(currentNode.id.split("-")[0]);
					var currentNodeColumn = parseInt(
						currentNode.id.split("-")[1]
					);

					this.boardTwoD[currentNodeRow][currentNodeColumn].status =
						"wall";
					console.log(this.boardTwoD);
				} else if (status === "wall") {
					currentNode.className = "unvisited";
					var currentNodeRow = parseInt(currentNode.id.split("-")[0]);
					var currentNodeColumn = parseInt(
						currentNode.id.split("-")[1]
					);
					this.boardTwoD[currentNodeRow][currentNodeColumn].status =
						"unvisited";
				}
			});
		}
	}
	let dfs_button = document.getElementById("dfs_button");
	dfs_button.addEventListener("click", (event) => {
		this.drawShortPath();
	});
};

Board.prototype.findPath = function (algorithmType) {
	var path = [];

	if (algorithmType === "DFS") {
		var result = dfs(
			this.start,
			this.target,
			this.boardTwoD,
			this.visitedList
		);
		console.log(this.boardTwoD);

		// success
		if (result === this.target) {
			var currentnode = this.boardTwoD[this.target.row][
				this.target.column
			];
			while (true) {
				path.unshift(currentnode);
				if (currentnode != this.start) {
					currentnode = currentnode.father;
				} else {
					break;
				}
			}
			path.unshift(this.start);
			return path;
		} else {
			return "No such path";
		}
		// fail
	}
	return null;
};

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

Board.prototype.drawVisitedNode = async function () {
	console.log("drawVisited");
	for (var i = 0; i < this.visitedList.length; i++) {
		await sleep(10);
		if (
			document.getElementById(this.visitedList[i].location).className !=
			"target"
		) {
			document.getElementById(this.visitedList[i].location).className =
				"visited";
		}
	}
};

Board.prototype.drawShortPath = async function () {
	this.path = newBoard.findPath("DFS");
	const result = await this.drawVisitedNode();
	console.log("drawPath");
	for (var i = 0; i < this.path.length; i++) {
		let currentNode = document.getElementById(this.path[i].location);
		if (currentNode.className === "visited") {
			await sleep(30);
			currentNode.className = "shortpath";
		}
	}
};

Board.clearPath = function () {};

Board.clearBoard = function () {};

let width = 50;
let height = 13;
// let width = Math.floor(document.getElementById("board").offsetWidth / 25);
// let height = Math.floor(document.getElementById("board").offsetHeight / 20);
let newBoard = new Board(height, width);
newBoard.initialize();
