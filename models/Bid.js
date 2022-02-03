const mongoose = require('mongoose');

const BidSchema = mongoose.Schema({
    duck: {
        type: String,
        required: true
    },
    clothingItem: {
        type: String,
        required: true
    },
    offer: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('Bid', BidSchema);