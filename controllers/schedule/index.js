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
        neverToDo.push(scheduleEvent);
    } else if (requiringActionDate.isBefore(moment())) {
        dayToDo.push(scheduleEvent);
    } else if (requiringActionDate.isBefore(moment().add(7, 'days'))) {
        weekToDo.push(scheduleEvent);
    } else if (requiringActionDate.isBefore(moment().add(28, 'days')))
        monthToDo.push(scheduleEvent);
    else {
        longerToDo.push(scheduleEvent);
    }
};

router.get('/', (req, res) => {
    Schedule.getByUserId(req.session.userId).then((schedule) => {
        // results = {
        //     day: [],
        //     week: [],
        //     month: [],
        //     longer: [],
        //     never: []
        // }
        dayToDo = [];
        weekToDo = [];
        monthToDo = [];
        longerToDo = [];
        neverToDo = [];
        // let lastDayOfMonth = moment().endOf('month');
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
        results = [dayToDo, weekToDo, monthToDo, longerToDo, neverToDo];
        console.log(results[0]);
        console.log(results[1]);
        console.log(results[2]);
        console.log(results[3]);
        console.log(results[4]);
        res.json(results);
    });
});

router.patch('/:id', (req, res) => {
    const data = req.body;
    Schedule.update({
        ...data,
        id: req.params.id,
        user_id: req.session.userId,
    }).then((schedule) => {
        res.json(schedule);
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
