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
  _id: mongoose.Schema.Types.ObjectId,
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

// Routes
app.get('/', (req, res) => {
  //res.sendFile(__dirname + '/views/index.html');
  Airplane.find({}, (err, airplanes) => {
    res.render('index', {
      airplanes: airplanes
    })
  });
});

app.get('/api/', (req, res) => {
  Airplane.find()
  .then(customers => {
    res.send(customers);
  }).catch(err => {
    res.status(500).send({
        message: err.message
    });
  });
});

// Add
app.post('/add', (req, res) => {
  const airplaneData = new Airplane({
    _id: mongoose.Types.ObjectId(),
    regNumber: req.body.regNumber,
    serialNumber: req.body.serialNumber
  });
  airplaneData.save().then(result => {
    res.redirect('/');
  }).catch(err => {
    res.status(400).send("Unable to save data");
  });
});

// Listen
app.listen(3000, () => {
  console.log('Server listing on 3000');
})