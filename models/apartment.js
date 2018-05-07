const mongoose = require('mongoose');
const ApartmentSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  description: String,
  carpetArea: {
    type: Number
  },
  buildupArea: {
    type: Number
  },
  status: {
    type: Number,
    default: -1
  }
});

module.exports = mongoose.model('Apartment', ApartmentSchema);
