const mongoose = require('mongoose');
const ContractSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    signDay: {
        type: Date,
        default: new Date()
    },
    contractPrice: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Contract', ContractSchema);
