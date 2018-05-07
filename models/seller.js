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
        minlength: 10
    },
    address: {
        type: String
    }
});

module.exports = mongoose.model('Seller', SellerSchema);