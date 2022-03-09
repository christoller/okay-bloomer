const express = require('express');
const Plants = require('../../models/plants');

const router = express.Router();

router.get('/', (req, res) => {
    Plants.getAll(req.query?.search || '').then((plants) => {
        res.json(plants);
    });
});

router.get('/:id', (req, res) => {
    Plants.getById(req.params.id).then((plant) => {
        res.json(plant);
    });
});

router.post('/', (req, res) => {
    Plants.create(req.body).then((plant) => {
        res.json(plant);
    });
});

router.delete('/', (req, res) => {
    Plants.delete(req.params.id).then(() =>
        res.json({ status: 'Blooming good delete' })
    );
});

module.exports = router;
