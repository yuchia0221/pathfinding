// const Node = require("./public/browser/node");
// let n = new Node(1, 2, "teah", "yoyoyo");
// console.log(n.child);
// import Node from "./public/browser/node";
// import dfs from "./Algorithms/DFS";

const express = require("express");
const app = express();

const PORT = process.env.PORT || 8000;

app.use("/", express.static(__dirname));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/test.html");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
