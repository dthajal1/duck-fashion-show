const express = require('express');
const router = express.Router();
const Bid = require('../models/Bid');
const ClothingItem = require('../models/ClothingItem');
const Duck = require('../models/Duck');

// Submit a bid
router.post('/transact/bid', (req, res) => {
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


// handle SELL command
router.post('/transact/sell', async (req, res) => {
    try {
        const clothingItemToSell = await ClothingItem.findOne({ name: req.body.clothingItem });
        if (clothingItemToSell) {
            // handle the logic
            let quantity = clothingItemToSell.units

            // find and sort the bids
            const bids = await Bid.find({ clothingItem: req.body.clothingItem });
            if (bids) {
                bids.sort((a, b) => b.offer - a.offer);

                let i = 0
                while (i < bids.length && quantity > 0) {
                    // get the best bidder
                    const bidder = await Duck.findOne({ name: bids[i].duck});
                    if (bidder) {
                        // check if bidder has enough money
                        if (bidder.money >= bids[i].offer) {
                            // sell it to the bidder
                            bidder.money -= bids[i].offer;
                            bidder.clothingItems.push(req.body.clothingItem);
                            const savedBidder = await bidder.save();
                            if (savedBidder) {
                                console.log('item sold!');
                            } else {
                                console.log('selling item failed');
                            }
                            quantity -= 1
                        }
                        // delete the bidder from db
                        await Bid.deleteOne({ duck: bids[i].duck });
                        i += 1
                    } else {
                        console.log(`No bidder with name ${bids[i].duck}`);
                    }
                }
            } else {
                console.log('No bidders left');
            }


            if (quantity != clothingItemToSell.units) {
                clothingItemToSell.units = quantity;
                const savedItem = await clothingItemToSell.save();
                if (savedItem) {
                    console.log('quantity updated');
                } else {
                    console.log('failed to update quantity');
                }
            }
        } else {
            console.log(`No ClothingItem with name ${itemToSell}`);
        }

        res.json({message: 'ClothingItems sold!'});
    } catch (err) {
        console.log(err);
        res.status(400).json({message: err});
    }
})




// handle TALLY command
router.get('/tally', async (req, res) => {
    try {
        let result = {}
        const ducks = await Duck.find()
        if (ducks) {
            for (let i = 0; i < ducks.length; i++) {
                let totalPoints = 0;
                for (let j = 0; j < ducks[i].clothingItems.length; j ++) {
                    const clothingItem = await ClothingItem.findOne({name: ducks[i].clothingItems[j]})
                    totalPoints += clothingItem.points;
                }
                result[ducks[i].name] = totalPoints;
            }
        }
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(400).json({message: err});
    }
})

module.exports = router;