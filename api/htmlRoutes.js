const path = require("path");

module.exports = app => {
    app.get("/api", (req, res) => {
        res.sendFile(path.join(__dirname, "../notes.html"));
    });

    app.get("/api", (req, res) => {
        res.sendFile(path.join(__dirname, "../index.html"));
    });
}