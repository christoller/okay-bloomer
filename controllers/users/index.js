const express = require('express');
const isLoggedIn = require('../../middleware/is_logged_in');
const Users = require('../../models/users');
const userCreateValidator = require('./create_user_validator');
const bcrypt = require('bcrypt');

const router = express.Router();

router.get('/', (req, res) => {
    Users.getAll().then((users) => {
        res.json(users);
    });
});

router.get('/:id', (req, res) => {
    Users.getById(req.params.id).then((user) => {
        res.json(user);
    });
});

router.post('/', userCreateValidator, (req, res, next) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
    Users.create(user)
        .then((user) => {
            if (!user) {
                return res.status(500).json({
                    message:
                        'Something went wrong creating the user. Please try again.',
                });
            }
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.userEmail = user.email;
            req.session.userFavouritePlants = user.favourite_plants;
            return res.json(user);
        })
        .catch((error) => {
            next(error);
        });
});

module.exports = router;
