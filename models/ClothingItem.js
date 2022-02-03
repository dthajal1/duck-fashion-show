const mongoose = require('mongoose');

const ClothingItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    units: {
        type: Number,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('ClothingItem', ClothingItemSchema);