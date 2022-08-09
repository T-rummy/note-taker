const express = require('express');
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const { notes } = require('./Develop/db/notes.json');

function findById(id, notesArray) {
    const result = notesArray.filter(notes => notes.id === id)[0];
    return result;
  }

  function createNewNote(body, notesArray) {

    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './Develop/db/notes.json'),
        JSON.stringify({notes: notesArray}, null, 2)
    );
    return note;
  }
  
  

app.get('/api/notes', (req, res) => {
    res.json(notes);
    console.log(notes)
  });

  app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if(result) {
        res.json(result);
    } else {
        res.send(404);
    }
      
  });
  
  app.post('/api/notes', (req, res) => {

    req.body.id = notes.length.toString();

    const note = createNewNote(req.body, notes);

    console.log(req.body);
    res.json(req.body);
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
  });

  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
  });
  
  
 
  app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
  
  
  