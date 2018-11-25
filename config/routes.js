var express = require('express');
var router = express.Router();
let controller = require('./controllers');

router.get('/api/', (req, res) => {
  controller.api(req, res);
});

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

module.exports = router;