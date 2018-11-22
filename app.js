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

//  Schema
let airplaneSchema = new mongoose.Schema({
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
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/static/main.js', (req, res) => {
  res.sendFile(__dirname + '/static/main.js');
});

app.get('/static/css/style.css', (req, res) => {
  res.sendFile(__dirname + '/static/css/style.css');
});

app.get('/api/', (req, res) => {
  Airplane.find()
  .then(airlines => {
    res.send(airlines);
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
});

// Add
app.post('/api', (req, res) => {
  console.log(req.body);
  const airplaneData = new Airplane(req.body);
  airplaneData.save().then(result => {
    res.redirect('/');
  }).catch(err => {
    console.warn(err);
  });
});

// Delete 
app.delete('/api', (req, res) => {
  Airplane.deleteOne({ _id: req.body.id }, function(err){
    if (!err) {
      res.redirect('/');
    }
    else {
      res.status(400).send("Unable to delete data");
    }
  });
});

// Edit
app.put('/api', (req, res) => {
  Airplane.findByIdAndUpdate(req.body.id, {
    $set: req.body
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  });
});

// Listen
const port = 3000;
app.listen(port, () => {
  console.log(`Server listing on ${port}`);
})