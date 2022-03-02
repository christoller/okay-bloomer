const db = require('../database/db');

const Users = {
    getAll: () => {
        const query = 'SELECT * FROM users';
        return db.query(query).then((response) => {
            return response.rows && response.rows.length > 0
                ? response.rows[0]
                : null;
        });
    },
    getById: (id) => {
        const query = 'SELECT * FROM users WHERE id = $1';
        return db.query(query, [id]).then((response) => {
            return response.rows && response.rows.length > 0
                ? response.rows[0]
                : null;
        });
    },
    getByUsername: (username) => {
        const query = 'SELECT * FROM users WHERE username = $1';
        return db.query(query, [username]).then((response) => {
            return response.rows && response.rows.length > 0
                ? response.rows[0]
                : null;
        });
    },
    create: ({ username, password, email, favourite_plants }) => {
        const query =
            'INSERT INTO users (username, password, email, favourite_plants) VALUES($1, $2, $3, $4) RETURNING *';
        return db
            .query(query, [username, password, email, favourite_plants])
            .then((response) => {
                return response.rows && response.rows.length > 0
                    ? response.rows[0]
                    : null;
            });
    },
};

module.exports = Users;
