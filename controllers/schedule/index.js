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
                    id: row.id,
                    plant: { id: row.plant_id, nickname: row.plant_nickname },
                    dueDate: nextWateringDate.toISOString(),
                    action: 'watering',
                };
                results.push(result);
            }

            let nextRepottingDate = moment(row.last_repotting_date);
            while (nextRepottingDate <= lastDayOfMonth) {
                nextRepottingDate = nextRepottingDate.add(
                    row.repotting_frequency_in_days,
                    'days'
                );
                let result = {
                    id: row.id,
                    plant: { id: row.plant_id, nickname: row.plant_nickname },
                    dueDate: nextRepottingDate.toISOString(),
                    action: 'repotting',
                };
                results.push(result);
            }

            let nextFertilisingDate = moment(row.last_fertilising_date);
            while (nextFertilisingDate <= lastDayOfMonth) {
                nextFertilisingDate = nextFertilisingDate.add(
                    row.fertilising_frequency_in_days,
                    'days'
                );
                let result = {
                    id: row.id,
                    plant: { id: row.plant_id, nickname: row.plant_nickname },
                    dueDate: nextFertilisingDate.toISOString(),
                    action: 'fertilising',
                };
                results.push(result);
            }

            let nextPruningDate = moment(row.last_pruning_date);
            while (nextPruningDate <= lastDayOfMonth) {
                nextPruningDate = nextPruningDate.add(
                    row.pruning_frequency_in_days,
                    'days'
                );
                let result = {
                    id: row.id,
                    plant: { id: row.plant_id, nickname: row.plant_nickname },
                    dueDate: nextPruningDate.toISOString(),
                    action: 'pruning',
                };
                results.push(result);
            }
        }
        results.sort((a, b) => {
            const dueDateA = moment(a.dueDate);
            const dueDateB = moment(b.dueDate);
            return dueDateA.unix() - dueDateB.unix();
        });
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
