const express = require("express");

const app = express();

app.use(express.json()); // parse incoming json to an object in order to access in our req handlers

app.post("/users", (req, res) => {
    console.log(req.body);
    res.send("testing");
});

module.exports = app;
