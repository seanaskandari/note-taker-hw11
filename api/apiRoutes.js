const path = require("path");
const fs = require("fs");
const notesArray = require("db.json");
const { v4: uuidv4 } = require('uuid');

// Changed and moved routes code from server.js into its own .js file //

module.exports = app => {
    app.get("/api", (req, res) => {
        fs.readFileSync("db.json");
        res.json(notesArray);
    });

    app.post("/api", (req, res) => {
        fs.readFileSync("db.json");
        const newNote = req.body;
        const file = path.join(__dirname, "db.json");
        newNote.id = uuidv4();
        notesArray.push(newNote);
        fs.writeFile(file, JSON.stringify(notesArray, null, 4), err => {
            if (err) throw err;
            console.log("New note has been saved!");
        });
        res.json(notesArray);
    });

    app.delete("/api/notes/:id", (req, res) => {
        const id = req.params.id;
        const file = path.join(__dirname, "db.json");
        for(const note of notesArray){
            if(id === note.id) {
                const index = notesArray.indexOf(note);
                notesArray.splice(index, 1);
                fs.writeFile(file, JSON.stringify(notesArray, null, 4), err => {
                    if (err) throw err;
                    console.log("Note has been deleted!");
                });
                res.end();
            }
        }
    })
};

module.exports = app => {   
    app.get("/api", (req, res) => {
        res.sendFile(path.join(__dirname, "../notes.html"));
    });
    app.get("/api", (req, res) => {
        res.sendFile(path.join(__dirname, "../index.html"));
    });
};
