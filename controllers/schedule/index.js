const express = require('express');
const Schedule = require('../../models/schedule');
const router = express.Router();
const moment = require('moment');
const req = require('express/lib/request');

const scheduleHander = (
    name,
    nickname,
    actionType,
    lastActionDate,
    actionFrequency,
    id
) => {
    let plantName = nickname ? nickname : name;
    let scheduleEvent = { plantName, actionType, id };
    let requiringActionDate = moment(lastActionDate).add(
        actionFrequency,
        'days'
    );
    if (actionFrequency === 0) {
        results.never.push(scheduleEvent);
    } else if (requiringActionDate.isBefore(moment())) {
        results.day.push(scheduleEvent);
    } else if (requiringActionDate.isBefore(moment().add(7, 'days'))) {
        results.week.push(scheduleEvent);
    } else if (requiringActionDate.isBefore(moment().add(28, 'days')))
        results.month.push(scheduleEvent);
    else {
        results.longer.push(scheduleEvent);
    }
};

router.get('/', (req, res) => {
    Schedule.getByUserId(req.session.userId).then((schedule) => {
        results = {
            day: [],
            week: [],
            month: [],
            longer: [],
            never: [],
        };
        for (const row of schedule) {
            scheduleHander(
                row.name,
                row.plant_nickname,
                'watering',
                row.last_watering_date,
                row.watering_frequency_in_days,
                row.id
            );
            scheduleHander(
                row.name,
                row.plant_nickname,
                'fertilising',
                row.last_fertilising_date,
                row.fertilising_frequency_in_days,
                row.id
            );
            scheduleHander(
                row.name,
                row.plant_nickname,
                'repotting',
                row.last_repotting_date,
                row.repotting_frequency_in_days,
                row.id
            );
            scheduleHander(
                row.name,
                row.plant_nickname,
                'pruning',
                row.last_pruning_date,
                row.pruning_frequency_in_days,
                row.id
            );
        }
        res.json(results);
    });
});

router.patch('/:id', (req, res) => {
    const data = req.body;
    Schedule.update({
        ...data,
        id: req.params.id,
        user_id: req.session.userId,
    })
        .then((schedule) => {
            res.json(schedule);
        })
        .catch(function (error) {
            res.json(error);
        });
});

router.post('/', (req, res) => {
    const data = req.body;
    Schedule.create({ ...data, user_id: req.session.userId }).then(
        (schedule) => {
            res.json(schedule);
        }
    );
});

module.exports = router;
