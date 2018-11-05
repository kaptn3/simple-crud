// Setup
var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/node-blog", { useNewUrlParser: true });
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//  Schema
let airplaneSchema = new mongoose.Schema({
  gid: {
    type: Number,
    required: true
  },
  regNumber: {
    type: Number,
    default: 0
  },
  serialNumber: {
    type: Number,
    default: 0
  },
  manufacturer: {
    type: String,
    default: 'null'
  },
  type: {
    type: String,
    default: 'null'
  },
  date: {
    type: Date,
    default: null
  },
  airlines: {
    type: String,
    default: 'null'
  },
  status: {
    type: String,
    default: 'null'
  }
});
let Airplane = mongoose.model('Airplane', airplaneSchema);
