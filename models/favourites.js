const db = require('../database/db');

const Favourites = {
    getByUserId: (user_id) => {
        const query =
            'SELECT plants.id, user_plant_favourites.id AS favourite_id, name, latin_name, image_url, description FROM plants INNER JOIN user_plant_favourites ON (user_plant_favourites.plant_id = plants.id)WHERE user_id = $1';
        return db.query(query, [user_id]).then((response) => {
            return response.rows && response.rows.length > 0
                ? response.rows
                : null;
        });
    },
    create: ({ user_id, plant_id }) => {
        const query =
            'INSERT INTO user_plant_favourites (user_id, plant_id) VALUES($1, $2) RETURNING *';
        return db.query(query, [user_id, plant_id]).then((response) => {
            return response.rows && response.rows.length > 0
                ? response.rows[0]
                : null;
        });
    },
    delete: (id) => {
        const query = `DELETE FROM user_plant_favourites WHERE id = $1`;
        return db.query(query, [id]);
    },
};

module.exports = Favourites;
