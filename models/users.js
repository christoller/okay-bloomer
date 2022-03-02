const db = require('../database/db');

const Users = {
    getUsers: () => {
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
    create: ({ username, password, admin = false }) => {
        const query =
            'INSERT INTO users (username, password, admin) VALUES($1, $2, $3) RETURNING *';
        return db.query(query, [username, password, admin]).then((response) => {
            return response.rows && response.rows.length > 0
                ? response.rows[0]
                : null;
        });
    },
};

module.exports = Users;
