const express = require('express');
const bodyParser = require('body-parser');
const router = require('./apis');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ "message": "Welcome to HomeLand data service" });
});

app.use('/data', router);

module.exports = app;
