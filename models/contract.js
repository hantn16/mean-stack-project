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

module.exports = mongoose.model('Contract', ContractSchema);
