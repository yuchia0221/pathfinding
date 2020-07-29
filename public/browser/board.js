function Board(height, width) {
	this.height = height; // Height of the board
	this.width = width; // Width of the board
	this.speed = "normal"; // The speed of running the path 'fast' 'normal' 'slow'
	this.start = null; // Start point of the path
	this.target = null; // Target of the path
	this.pathDirection = null; // The direction of the path
	this.currentAlgorithms; // The Algorithm user choose
	this.wallNode - List = []; // Record the id of the wall node
	this.boardTwoD = [];
}

Board.createBoard = function () {};

Board.drawShortPath = function () {};

Board.drawVisitedNode = function () {};

Board.clearPath = function () {};

Board.clearBoard = function () {};

module.exports = Board;
