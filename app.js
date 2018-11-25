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

app.use(express.static(__dirname + '/static'));

// Routes
app.get('/', (req, res) => {
  res.sendFile('/views/index.html', { root: __dirname });
});

var routes = require('./config/routes.js');
app.use('/', routes);

// Listen
const port = 3000;
app.listen(port, () => {
  console.log(`Server listing on ${port}`);
})