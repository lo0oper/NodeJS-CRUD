
const dbConnection = require('./config/connection');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

app.get('/healthcheck', (req, res) => {
    res.status(200).send('OK');
});

app.listen(3000,()=>console.log('Crud Application is live on localhost:3000'));
console.log("ALL UP.")