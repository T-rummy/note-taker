const express = require('express');
const PORT = process.env.PORT || 3001;

const app = express();
const { notes } = require('./Develop/db/notes.json');

function findById(id, notesArray) {
    const result = notesArray.filter(notes => notes.id === id)[0];
    return result;
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
    res.json(notes);
    console.log(notes)
  });
 
  app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
  
  
  