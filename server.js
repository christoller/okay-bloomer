if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);
const db = require('./database/db');

const usersController = require('./controllers/users');

// const errorHandler = require('./middleware/error_handler');
// const logger = require('./middleware/logger');

// const pg = require('pg');

const app = express();
const port = process.env.PORT || 3000;

app.use(
    expressSession({
        store: new pgSession({
            pool: db, // Connects to our postgres db
            createTableIfMissing: true, // Creates a session table in your database (go look at it!)
        }),
        secret: process.env.SESSION_SECRET, // Needs a secret key to keep session data secure
        resave: false,
        saveUninitialized: false,
    })
);

// app.use(logger);
app.use(express.json());
app.use(express.static('client'));

app.get('/', (req, res) => {
    res.send('hello');
});

app.use('/api/users', usersController);
// app.use(errorHandler);

app.listen(port, () => {
    console.log(`server listening on port: ${port}`);
});
