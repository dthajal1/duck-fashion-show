const express = require('express');
const router = express.Router();
const Duck = require('../models/Duck');

// Register a duck
router.post('/', (req, res) => {
    // console.log(req.body);
    const newDuck = new Duck({
        name: req.body.name,
        money: req.body.money
    });
    newDuck.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json({ message: err });
        })
})

// Get a specific duck
router.get('/:name', (req, res) => {
    
    Duck.findOne({name: req.params.name})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json({ message: err });
        })
})

module.exports = router;