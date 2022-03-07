const express = require('express');
const Schedule = require('../../models/schedule');
const router = express.Router();
const moment = require('moment');

router.get('/', (req, res) => {
    Schedule.getByUserId(req.session.userId).then((schedule) => {
        let results = [];
        let lastDayOfMonth = moment().endOf('month');
        for (const row of schedule) {
            // console.log(row);
            let nextWateringDate = moment(row.last_watering_date);
            // let shoe = 0;
            let resultsToReturn = 1;
            while (
                resultsToReturn < 2 &&
                row.watering_frequency_in_days != 0 &&
                nextWateringDate.isSameOrBefore(lastDayOfMonth, 'day')
            ) {
                nextWateringDate = nextWateringDate.add(
                    row.watering_frequency_in_days,
                    'days'
                );
                // OLD IMPLEMENTATION USING NICKNAME
                // let result = {
                //     id: row.id,
                //     plant: { id: row.plant_id, nickname: row.plant_nickname },
                //     dueDate: nextWateringDate.toISOString(),
                //     action: 'watering',
                // };
                // TEMPORARY CODE USING PLANT NAME
                // if (row.plant_nickname !== null) {
                // }
                let result = {
                    id: row.id,
                    plant: { id: row.plant_id, nickname: row.name },
                    dueDate: nextWateringDate.toISOString(),
                    action: 'watering',
                };
                // console.log(
                //     `${result.id} ${result.nickname} ${result.dueDate}`
                // );
                results.push(result);
                resultsToReturn++;
            }
            // console.log(
            //     results.filter(
            //         (result) => result.id === 12 && result.action === 'watering'
            //     )
            // );
            let nextRepottingDate = moment(row.last_repotting_date);
            while (
                row.repotting_frequency_in_days != 0 &&
                nextRepottingDate.isSameOrBefore(lastDayOfMonth, 'day')
            ) {
                nextRepottingDate = nextRepottingDate.add(
                    row.repotting_frequency_in_days,
                    'days'
                );
                let result = {
                    id: row.id,
                    plant: { id: row.plant_id, nickname: row.name },
                    dueDate: nextRepottingDate.toISOString(),
                    action: 'repotting',
                };
                results.push(result);
            }

            let nextFertilisingDate = moment(row.last_fertilising_date);
            while (
                row.fertilising_frequency_in_days != 0 &&
                nextFertilisingDate.isSameOrBefore(lastDayOfMonth, 'day')
            ) {
                nextFertilisingDate = nextFertilisingDate.add(
                    row.fertilising_frequency_in_days,
                    'days'
                );
                let result = {
                    id: row.id,
                    plant: { id: row.plant_id, nickname: row.name },
                    dueDate: nextFertilisingDate.toISOString(),
                    action: 'fertilising',
                };
                results.push(result);
            }

            let nextPruningDate = moment(row.last_pruning_date);
            while (
                row.pruning_frequency_in_days != 0 &&
                nextPruningDate.isSameOrBefore(lastDayOfMonth, 'day')
            ) {
                nextPruningDate = nextPruningDate.add(
                    row.pruning_frequency_in_days,
                    'days'
                );
                let result = {
                    id: row.id,
                    plant: { id: row.plant_id, nickname: row.name },
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
