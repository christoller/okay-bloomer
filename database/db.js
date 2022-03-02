// const pg = require('pg');

// const db = new pg.Pool({
//     database: 'ok_bloomer',
// });

// let db;
// if (process.env.NODE_ENV === 'production') {
//     db = new pg.Pool({
//         connectionString: process.env.DATABASE_URL,
//         ssl: {
//             rejectUnauthorized: false,
//         },
//     });
// } else {
//     db = new pg.Pool({
//         database: 'okay_bloomer',
//         // password: 'optional_password', // If you have a password on your local db
//     });
// }

// module.exports = db;

const pg = require('pg');

const db = new pg.Pool({
    database: process.env.DB_NAME || 'ok_bloomer',
});

module.exports = db;
