const express = require('express');
const Schedule = require('../../models/schedule');
const router = express.Router();
const moment = require('moment');
const req = require('express/lib/request');

const scheduleHandler = (
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
    // console.log(
    //     `Plantname: ${plantName}, actionType: ${actionType}, id: ${id}`
    // );
    if (actionFrequency === 0) {
        results.never.push(scheduleEvent);
    } else if (requiringActionDate.isBefore(moment())) {
        results.day.push(scheduleEvent);
    } else if (requiringActionDate.isBefore(moment().add(7, 'days'))) {
        results.week.push(scheduleEvent);
        // results.week.forEach((entry) => {
        //     console.log(
        //         `This is this weeks entry ${entry.plantName} ${entry.id} ${entry.actionType}`
        //     );
        // });
    } else if (requiringActionDate.isBefore(moment().add(28, 'days'))) {
        results.month.push(scheduleEvent);
        results.month.forEach((entry) => {
            // console.log(
            //     `This is this months entry ${entry.plantName} ${entry.id} ${entry.actionType}`
            // );
        });
    } else {
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
            scheduleHandler(
                row.name,
                row.plant_nickname,
                'watering',
                row.last_watering_date,
                row.watering_frequency_in_days,
                row.id
            );
            scheduleHandler(
                row.name,
                row.plant_nickname,
                'fertilising',
                row.last_fertilising_date,
                row.fertilising_frequency_in_days,
                row.id
            );
            scheduleHandler(
                row.name,
                row.plant_nickname,
                'repotting',
                row.last_repotting_date,
                row.repotting_frequency_in_days,
                row.id
            );
            scheduleHandler(
                row.name,
                row.plant_nickname,
                'pruning',
                row.last_pruning_date,
                row.pruning_frequency_in_days,
                row.id
            );
        }
        // console.log(results);
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

router.delete('/:id', (req, res) => {
    id = req.params.id;
    Schedule.delete({ id, user_id: req.session.userId }).then((schedule) => {
        res.json(schedule);
    });
});

module.exports = router;
