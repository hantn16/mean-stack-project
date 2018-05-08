const mongoose = require('mongoose');
const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    idNo: {
        type: String,
        minlength: 9,
        required: true
    },
    dateOfIssue: {
        type: Date
    },
    placeOfIssue: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    email: String,
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

module.exports = mongoose.model('Customer', CustomerSchema);