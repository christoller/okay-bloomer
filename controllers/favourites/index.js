const express = require('express');
const isLoggedIn = require('../../middleware/is_logged_in');
const Favourites = require('../../models/favourites');

const router = express.Router();

router.get('/', isLoggedIn, (req, res) => {
    Favourites.getByUserId(req.session.userId).then((favourites) => {
        res.json(favourites);
    });
});

router.post('/', isLoggedIn, (req, res) => {
    const data = req.body;
    Favourites.create({ ...data, user_id: req.session.userId }).then(
        (favourites) => {
            res.json(favourites);
        }
    );
});

router.delete('/:id', isLoggedIn, (req, res) => {
    Favourites.delete(req.params.id).then(() =>
        res.json({ status: 'Favourites has been deleted' })
    );
});

module.exports = router;
