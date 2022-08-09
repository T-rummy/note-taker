const express = require('express');
const PORT = process.env.PORT || 3001;

const app = express();
const { notes } = require('./Develop/db/notes.json');

app.get('/api/notes', (req, res) => {
    res.json(notes);
    console.log(notes)
  });
  
  app.post('/api/notes', (req, res) => {
    res.json(notes);
    console.log(notes)
  });
 
  app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
  
  
  