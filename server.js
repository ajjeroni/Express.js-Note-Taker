const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('fs');

const app = express();
const PORT = 3001; 

app.use(express.static('public'));

app.get('/', (req, res) => res.send('Navigate to notes'))

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.listen(PORT, () =>
    console.log(`Note Taker app listenting at http://localhost:${PORT}`)
);