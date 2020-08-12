function Node(r, c, status, father) {
	this.row = r;
	this.column = c;
	this.location = `${r}-${c}`;
	this.status = status;
	this.father = father;
	this.child = [];
}

//module.exports = Node;
export default Node;
