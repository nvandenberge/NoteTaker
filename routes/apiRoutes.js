const notesData = require("../db/db.json");
const fs = require("fs");

module.exports = function (app) {
  app.get("/api/notes", (req, res) => res.json(notesData));

  app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    // Adding unique ID using array length
    const uniqueID = (notesData.length).toString();
    newNote.id = uniqueID;
    notesData.push(newNote);
    // Updating our "database" 
    fs.writeFileSync("./db/db.json", JSON.stringify(notesData));
    return res.json(notesData);
  });

  //Find note by ID and delete it
  app.delete("/api/notes/:id", (req, res) => {
    const { id } = req.params;
    const noteIndex = notesData.findIndex((n) => n.id == id);
    notesData.splice(noteIndex, 1);
    fs.writeFileSync("./db/db.json", JSON.stringify(notesData));
    return res.json(notesData);;
  });
};
