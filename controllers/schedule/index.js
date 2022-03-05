const express = require('express');
const Schedule = require('../../models/schedule');
const router = express.Router();

router.get('/', (req, res) => {
    Schedule.getById(req.session.userId).then((schedule) => {
        let results = [];
        for (const row of schedule) {
            let result = {
                plant: { id: row.plant_id, nickname: row.plant_nickname },
                dueDate: new Date(),
                action: 'Watering',
            };
            results.push(result);
        }
        res.json(results);
    });
});

router.post('/', (req, res) => {
    Schedule.create(req.body).then((schedule) => {
        res.json(schedule);
    });
});

module.exports = router;
