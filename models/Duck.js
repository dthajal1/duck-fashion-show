const mongoose = require('mongoose');

const DuckSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    money: {
        type: Number,
        required: true
    },
    clothingItems:[]
})

module.exports = mongoose.model('Duck', DuckSchema);