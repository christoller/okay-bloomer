const express = require('express');
const Schedule = require('../../models/schedule');
const router = express.Router();

router.get('/:id', (req, res) => {
    Schedule.getById(req.params.id).then((schedule) => {
        res.json(schedule);
    });
});

router.post('/', (req, res) => {
    Schedule.create(req.body).then((schedule) => {
        res.json(schedule);
    });
});

module.exports = router;
