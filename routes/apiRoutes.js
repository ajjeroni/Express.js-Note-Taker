const router = require('express').Router();
const db = require('../db/db.json')
const uuid = require('../helpers/uuid');
const { readAndAppend, readDataFromFile } = require('../helpers/fsUtils');


router.get('/notes', (req, res) => {
  const notes = readDataFromFile('./db/db.json');
  res.json(notes);
});

router.post('/notes', (req, res) => {
  console.info(`${req.method} request recieved to add a review`)
  const { title, text } = req.body; 
  if (title && text) {
      const newNote = {
          title,
          text,
          id: uuid(),
      };

      readAndAppend(newNote, './db/db.json')
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting review');
    }
  }
);

router.get('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  readDataFromFile('./db/db.json')
  .then((data) => JSON.parse(data))
  .then((json) => {
    const result = json.filter((note) => note.id === noteId);
    return result.length > 0
      ? res.json(result)
      : res.json('No note with that ID');
  });
})

module.exports = router;