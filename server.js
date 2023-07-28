const express = require('express');
const path = require('path');
const db = require('./db/db.json')
const uuid = require('./helpers/uuid');
const { readAndAppend, readFromFile } = require('./helpers/fsUtils');

const app = express();
const PORT = 3001; 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => res.send('Navigate to notes'))


app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => res.json(db));

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request recieved to add a review`)
    const { title, text } = req.body; 
    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');
    
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
)

app.listen(PORT, () =>
    console.log(`Note Taker app listenting at http://localhost:${PORT}`)
);