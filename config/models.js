var mongoose = require('mongoose');

let airplaneSchema = new mongoose.Schema({
  regNumber: {
    type: String,
    default: 0,
    required: true
  },
  serialNumber: {
    type: Number,
    default: 0,
    min: 1,
    max: 100,
    required: true
  },
  manufacturer: {
    type: String,
    default: 'none',
    required: true
  },
  type: {
    type: String,
    default: 'none',
    required: true
  },
  date: {
    type: Date,
    default: null,
    required: true
  },
  airlines: {
    type: String,
    default: 'none',
    required: true
  },
  status: {
    type: String,
    default: 'none',
    required: true
  } 
});

module.exports = mongoose.model('Airplane', airplaneSchema);
