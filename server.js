const express = require('express');
const PORT = process.env.PORT || 3002;
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const { notes } = require('./Develop/db/notes.json');

function findById(id, notesArray) {
  const result = notesArray.filter(note => note.id === id)[0];
  return result;
}

function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);

  return note;

}

app.get('/api/notes', (req, res) => {
  let results = notes;
  res.json(results);
});

app.get('/api/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

app.post('/api/notes', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = notes.length.toString();
  
  const note = createNewNote(req.body, notes);
    res.json(note);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
  
  