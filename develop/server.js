const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');
const noteData = require('/Users/davidhardin/Desktop/ch/ch11/Develop/db/db.json');

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


app.post('/api/notes', (req, res, next) => {

    console.info(`${req.method} request received to add a note`);

    console.log(req.body)
    const { title, text } = req.body;

    if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    const noteString = JSON.stringify(newNote);

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        
        const parsedNotes = JSON.parse(data);
        parsedNotes.push(newNote);

        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('added note')
        )}
    })
        const response = {
          status: 'success',
          body: noteData,
          notes: noteData,
        };
        
        console.log(response);
        res.status(201).json(response);
        
      } else {
        res.status(500).json('Error in posting review');
      }
      next()
    })


app.get('/api/notes', (req, res, next) => {

    res.json(noteData)

    console.info(`${req.method} request received to get note`);

    console.log("res",res.body)
    console.log("req",req.body)

});



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))

})

app.listen(PORT, () =>
  console.log(`listening at http://localhost:${PORT} `)
)