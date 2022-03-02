const express = require('express');
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
    // Note that the asynchronous version is preferred but we use Sync here for ease
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
            return res.json(user);
        })
        .catch((error) => {
            // When in an asynchronous code block, we have to call the next function
            // to handle the error
            next(error);
        });
});

module.exports = router;
