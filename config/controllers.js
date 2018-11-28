var Airplane = require('./models');
var User = require('./user');

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
  Airplane.deleteOne({
    _id: req.body.id
  }, function (err) {
    if (!err) {
      res.redirect('/');
    } else {
      res.status(400).send("Unable to delete data");
    }
  });
}

controller.edit = (req, res) => {
  Airplane.findByIdAndUpdate(req.body._id, {
    $set: req.body
  }, {
    sort: {
      _id: -1
    },
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  });
}

controller.login = (req, res) => {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        console.log(err)
      } else {
        req.session.userId = user._id;
        return res.redirect('/');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    console.log(err)
  }
}

module.exports = controller;