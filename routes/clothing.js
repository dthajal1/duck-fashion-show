const express = require('express');
const router = express.Router();
const ClothingItem = require('../models/ClothingItem');

// Create a clothing item
router.post('/', (req, res) => {

    ClothingItem.findOne({name: req.body.name})
        .then(existingItem => {
            if (existingItem != null) {
                // update the existing clothing item
                const prevUnits = existingItem.units
                const prevPoints = existingItem.points
                const currUnits = req.body.units
                const currPoints = req.body.points

                existingItem.units = prevUnits + currUnits
                existingItem.points = (prevUnits * prevPoints + currUnits * currPoints) / existingItem.units

                existingItem.save()
                    .then(data => {
                        res.json(data);
                    })
                    .catch(err => {
                        res.status(400).json({ message: err });
                    })

            } else {
                // create a new clothing item
                const newClothing = new ClothingItem({
                    name: req.body.name,
                    units: req.body.units,
                    points: req.body.points
                });
                newClothing.save()
                    .then(data => {
                        res.json(data);
                    })
                    .catch(err => {
                        res.status(400).json({ message: err });
                    })
            }
        })
        .catch(err => {
            res.status(400).json({ message: err});
        })
})

module.exports = router;