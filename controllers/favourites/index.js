const express = require('express');
const Favourites = require('../../models/favourites');

const router = express.Router();

router.get('/', (req, res) => {
    // TODO add is logged in middleware
    Favourites.getByUserId(req.session.userId).then((favourites) => {
        res.json(favourites);
    });
});

module.exports = router;
