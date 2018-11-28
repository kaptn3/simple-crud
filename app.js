// Setup
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var controller = require('./config/controllers');

var session = require('express-session')
var MongoStore = require('connect-mongo')(session);

mongoose.connect("mongodb://localhost:27017/node-blog", { useNewUrlParser: true });
var db = mongoose.connection;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/static'));

// Session
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// Routes
app.get('/', (req, res) => {
  if (req.session.userId) {
    res.sendFile('/views/index.html', { root: __dirname });
  } else {
    return res.redirect('/auth');
  }
});

app.get('/api/', (req, res) => {
  if (req.session.userId) {
    controller.api(req, res);
  } else {
    return res.redirect('/auth');
  }
});

app.get('/auth', (req, res) => {
  res.sendFile('/views/auth.html', { root: __dirname });
});

var routes = require('./config/routes.js');
app.use('/', routes);

// Listen
const port = 3000;
app.listen(port, () => {
  console.log(`Server listing on ${port}`);
})
