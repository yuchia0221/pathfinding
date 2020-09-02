const express = require("express");
const app = express();

const PORT = process.env.PORT || 8000;

app.use("/", express.static(__dirname));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/test.html");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
