const db = require('../database/db');

const Plants = {
    getAll: (name) => {
        const query = 'SELECT * FROM PLANTS WHERE name ILIKE $1';

        return db.query(query, [`%${name}%`]).then((response) => {
            return response.rows;
        });
    },
    getById: (id) => {
        const query = `SELECT * FROM plants WHERE id = $1`;
        return db.query(query, [id]).then((response) => {
            return response.rows ? response.rows[0] : {};
        });
    },

    create: ({
        name,
        latin_name,
        description,
        watering_frequency_in_days,
        sunlight,
        image_url,
        plant_location,
        fertilising_frequency_in_days,
        pruning_frequency_in_days,
        repotting_frequency_in_days,
        soil_type,
    }) => {
        const query = `
        INSERT INTO plants (
            name,
            latin_name,
            description,
            watering_frequency_in_days,
            sunlight,
            image_url,
            plant_location,
            fertilising_frequency_in_days,
            pruning_frequency_in_days,
            repotting_frequency_in_days,
            soil_type) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
        RETURNING *`;
        return db
            .query(query, [
                name,
                latin_name,
                description,
                watering_frequency_in_days,
                sunlight,
                image_url,
                plant_location,
                fertilising_frequency_in_days,
                pruning_frequency_in_days,
                repotting_frequency_in_days,
                soil_type,
            ])
            .then((response) => {
                return response.rows ? response.rows[0] : {};
            });
    },
    delete: (id) => {
        const query = `DELETE FROM plants WHERE id = $1`;
        return db.query(query, [id]);
    },
};

module.exports = Plants;
