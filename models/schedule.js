const db = require('../database/db');

const Schedules = {
    getById: (id) => {
        const query = `SELECT name, watering_frequency_in_days, fertilising_frequency_in_days, repotting_frequency_in_days, pruning_frequency_in_days, image_url, date_added FROM user_plant_schedule INNER JOIN plants ON (user_plant_schedule.plant_id = plants.id)WHERE user_id = ${id}`;
        return db.query(query).then((response) => {
            return response.rows;
        });
    },

    create: ({ user_id, plant_id, date_added }) => {
        const query =
            'INSERT INTO user_plant_schedule (user_id, plant_id, date_added) VALUES($1, $2, $3) RETURNING *';
        return db
            .query(query, [user_id, plant_id, date_added])
            .then((response) => {
                return response.rows && response.rows.length > 0
                    ? response.rows[0]
                    : null;
            });
    },
};

module.exports = Schedules;
