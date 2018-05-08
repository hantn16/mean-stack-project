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
  },
  _createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
  },
  _createdAt: {
      type: mongoose.Schema.Types.Date,
      required: true
  },
  _modifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
  },
  _modifiedAt: {
      type: mongoose.Schema.Types.Date,
      default: null
  }
});

module.exports = mongoose.model('Apartment', ApartmentSchema);
