const db = require('../database/db');


const Schedules = {
    getByUserId: (id) => {
        const query = `SELECT user_plant_schedule.id, name, plant_id, plant_nickname, watering_frequency_in_days, fertilising_frequency_in_days, repotting_frequency_in_days, pruning_frequency_in_days, image_url, last_watering_date, last_fertilising_date, last_repotting_date, last_pruning_date FROM user_plant_schedule INNER JOIN plants ON (user_plant_schedule.plant_id = plants.id)WHERE user_id = ${id}`;
        return db.query(query).then((response) => {
            return response.rows;
        });
    },

    update({ action, id, user_id, newName }) {
        let field = '';
        let query = '';
        if (newName) {
            query = `UPDATE user_plant_schedule set plant_nickname = '${newName}' WHERE id = $1 AND user_id = $2 RETURNING *`;
        } else {
            switch (action) {
                case 'watering':
                    field = 'last_watering_date';
                    break;
                case 'fertilising':
                    field = 'last_fertilising_date';
                    break;
                case 'pruning':
                    field = 'last_pruning_date';
                    break;
                case 'repotting':
                    field = 'last_repotting_date';
                    break;
                default:
                    throw new Error('Invalid field input');
            }
            query = `UPDATE user_plant_schedule set ${field} = NOW()::timestamptz WHERE id = $1 AND user_id = $2 RETURNING *`;
        }
        return db.query(query, [id, user_id]).then((response) => {
            return response.rows && response.rows.length > 0
                ? response.rows[0]
                : null;
        });
    },

    create: ({ user_id, plant_id, plant_nickname }) => {
        const query =
            'INSERT INTO user_plant_schedule (user_id, plant_id, plant_nickname, last_watering_date, last_fertilising_date, last_repotting_date, last_pruning_date ) VALUES($1, $2, $3, NOW()::timestamptz, NOW()::timestamptz, NOW()::timestamptz, NOW()::timestamptz) RETURNING *';
        return db
            .query(query, [user_id, plant_id, plant_nickname])
            .then((response) => {
                return response.rows && response.rows.length > 0
                    ? response.rows[0]
                    : null;
            });
    },
};

module.exports = Schedules;
