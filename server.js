const express = require('express');
const htmlRoute = require('./routes/htmlRoutes');
const apiRoute = require('./routes/apiRoutes');

const app = express();
const port = process.env.PORT || 3001; 


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/api', apiRoute);
app.use('/', htmlRoute);

app.listen(port, () =>
    console.log(`Note Taker app listenting at http://localhost:${port}`)
);