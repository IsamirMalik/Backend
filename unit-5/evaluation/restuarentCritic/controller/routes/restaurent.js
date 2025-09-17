const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

let restaurents = [];


router.get('/', (req, res) => {
    // res.send(`getting all the restaurents`)
    res.sendFile(path.join(__filename , '../../../' , 'views' , 'restaurents.ejs'))
});
router.get('/:restaurentId', (req, res) => {
    res.send(`getting a restaurent with its id`)
});

router.post('/', (req, res) => {
    let data = req.body;
    restaurents.push(data);
    fstat.writeFileSync('restaurents.json', JSON.stringify(restaurents));
    res.send(`Adding a new restaurent`)
});

router.put('/:restaurentId', (req, res) => {
    res.send(`Updating a restaurent`)
});

router.post('/:restaurentId/reviews', (req, res) => {
    res.send(`getting all the reviews for a restaurent using its id`)
});

router.get('/:restaurentId/reviews', (req, res) => {
    res.send(path.join(__filename , '../../../' , 'views' , 'reviews.ejs'))
})

module.exports = router;