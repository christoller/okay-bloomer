const db = require('../database/db');

const Users = {
    getAll: () => {
        const query = 'SELECT * FROM users';
        return db.query(query).then((response) => {
            return response.rows && response.rows.length > 0
                ? response.rows
                : [];
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
    getByEmail: (email) => {
        const query = 'SELECT * FROM users WHERE email = $1';
        return db.query(query, [email]).then((response) => {
            return response.rows && response.rows.length > 0
                ? response.rows[0]
                : null;
        });
    },
    // ONE WAY TO SOLVE ASYNC ISSUE
    // usernameExists: (username) => {
    //     const query = 'SELECT * FROM users WHERE username = $1';
    //     return db.query(query, [username]).then((response) => {
    //         return response.rows && response.rows.length > 0;
    //     });
    // },
    create: ({ username, password, email }) => {
        const query =
            'INSERT INTO users (username, password, email) VALUES($1, $2, $3) RETURNING *';
        return db.query(query, [username, password, email]).then((response) => {
            return response.rows && response.rows.length > 0
                ? response.rows[0]
                : null;
        });
    },
};

module.exports = Users;
