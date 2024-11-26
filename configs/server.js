const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({strict: true}));
app.use(bodyParser.urlencoded({extended: true}));

require('../routes/routes')(app);

module.exports = app;