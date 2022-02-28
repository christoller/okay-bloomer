const pg = require('pg');

const db = new pg.Pool({
    database: 'ok_bloomer',
});

module.exports = db;
