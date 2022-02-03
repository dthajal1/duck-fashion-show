const express = require('express');
const router = express.Router();
const Bid = require('../models/Bid');

// Submit a bid
router.post('/bid', (req, res) => {
    const newBid = new Bid({
        duck: req.body.duck,
        clothingItem: req.body.clothingItem,
        offer: req.body.offer
    });
    newBid.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json({ message: err });
        })
})

module.exports = router;