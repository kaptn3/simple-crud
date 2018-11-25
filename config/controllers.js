var Airplane = require('./models');

let controller = {};

controller.api = (req, res) => {
  Airplane.find()
  .then(airlines => {
    res.send(airlines);
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
}

controller.save = (req, res) => {
  const airplaneData = new Airplane(req.body, false);
  airplaneData.save().then(result => {
    res.redirect('/');
  }).catch(err => {
    console.warn(err);
  });
}

controller.delete = (req, res) => {
  Airplane.deleteOne({ _id: req.body.id }, function(err){
    if (!err) {
      res.redirect('/');
    }
    else {
      res.status(400).send("Unable to delete data");
    }
  });
}

controller.edit = (req, res) => {
  Airplane.findByIdAndUpdate(req.body._id, {
    $set: req.body
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  });
}

module.exports = controller;