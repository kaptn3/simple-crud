var mongoose = require('mongoose');

let airplaneSchema = new mongoose.Schema({
  regNumber: {
    type: String,
    default: 0
  },
  serialNumber: {
    type: Number,
    default: 0
  },
  manufacturer: {
    type: String,
    default: 'none'
  },
  type: {
    type: String,
    default: 'none'
  },
  date: {
    type: Date,
    default: null
  },
  airlines: {
    type: String,
    default: 'none'
  },
  status: {
    type: String,
    default: 'none'
  } 
});

module.exports = mongoose.model('Airplane', airplaneSchema);
