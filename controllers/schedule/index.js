const express = require('express');
const Schedule = require('../../models/schedule');
const router = express.Router();
const moment = require('moment');

router.get('/', (req, res) => {
    Schedule.getById(req.session.userId).then((schedule) => {
        let results = [];
        let lastDayOfMonth = moment().endOf('month');
        for (const row of schedule) {
            let nextWateringDate = moment(row.last_watering_date);

            while (nextWateringDate <= lastDayOfMonth) {
                nextWateringDate = nextWateringDate.add(
                    row.watering_frequency_in_days,
                    'days'
                );
                let result = {
                    plant: { id: row.plant_id, nickname: row.plant_nickname },
                    dueDate: nextWateringDate.toISOString(),
                    action: 'watering',
                };
                results.push(result);
            }
        }
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const data = req.body
    Schedule.create({...data, user_id: req.session.userId}).then((schedule) => {
        res.json(schedule);
    });
});

module.exports = router;
