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
    email: String
});

module.exports = mongoose.model('Customer', CustomerSchema);