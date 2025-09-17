const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log(`getting all the restaurents`)
});
router.get('/:restaurentId', (req, res) => {
    console.log(`getting a restaurent with its id`)
});

router.post('/', (req, res) => {
    console.log(`Adding a new restaurent`)
});

router.put('/:restaurentId', (req, res) => {
    console.log(`Updating a restaurent`)
});

router.post('/:restaurentId/reviews', (req, res) => {
    console.log(`adding reviews`)
});

router.get('/:restaurentId/reviews', (req, res) => {
    console.log(`getting all the reviews for a restaurent using its id`)
})

module.exports = router;