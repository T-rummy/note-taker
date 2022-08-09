const express = require('express');
const app = express();
const { notes } = require('./Develop/db/notes.json');

app.get('/api/notes', (req, res) => {
    res.json(notes);
    console.log(notes)
  });
  

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });
  
  