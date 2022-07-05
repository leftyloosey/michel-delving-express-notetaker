const notes = require('express').Router();
const { readFromFile, readAndAppend, deleteNote } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');


notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
  console.log(req.body)

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`added note`);
  } else {
    res.error('error');
  }
})

notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    deleteNote(noteId, './db/db.json')
    res.send("deleted note")
})



module.exports = notes;
