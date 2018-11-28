var express = require('express');
var router = express.Router();
let controller = require('./controllers');

// Add
router.post('/api', (req, res) => {
  controller.save(req, res);
});

// Delete 
router.delete('/api', (req, res) => {
  controller.delete(req, res);
});

// Edit
router.put('/api', (req, res) => {
  controller.edit(req, res);
});

router.post('/login', (req, res) => {
  controller.login(req, res);
});

module.exports = router;