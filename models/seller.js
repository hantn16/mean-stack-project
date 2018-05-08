const mongoose = require('mongoose');
const SellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    taxCode: {
        type: String,
        minlength: 10,
        unique: true
    },
    address: {
        type: String
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

module.exports = mongoose.model('Seller', SellerSchema);