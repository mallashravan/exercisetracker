'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
const db = require('./db');
const router = require('./routes/router')
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.urlencoded());
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/public', express.static(process.cwd() + '/public'));
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
app.use('/api/exercise/',router);
app.listen(port, function () {
  console.log('Node.js listening ...');
});


