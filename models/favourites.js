const db = require('../database/db');

const Favourites = {
    getByUserId: (user_id) => {
        const query =
            'SELECT plants.id, name, latin_name, image_url, description FROM plants INNER JOIN user_plant_favourites ON (user_plant_favourites.plant_id = plants.id)WHERE user_id = $1';
        return db.query(query, [user_id]).then((response) => {
            return response.rows && response.rows.length > 0
                ? response.rows
                : null;
        });
    },
    delete: (user_id) => {
        const query = `DELETE FROM plants WHERE user_id = $1`;
        return db.query(query, [user_id]);
    },
};

module.exports = Favourites;
