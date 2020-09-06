function Node(r, c, status, father) {
    this.row = r;
    this.column = c;
    this.location = `${r}-${c}`;
    this.status = status;
    this.father = father;
    this.child = [];
    this.weight = 0;
    this.dist = 0;
    this.totalDist = 0;
}

export default Node;