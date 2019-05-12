const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const user = require('./app/controllers/user.controller.js');

// create express app
const app = express();

let allowedOrigin = 'http://localhost:3000';
if (process.env.NODE && ~process.env.NODE.indexOf("heroku")) {
    allowedOrigin = 'https://tensor-webdev19-tasks-client.herokuapp.com';
}

app.use(cors({ origin: allowedOrigin, credentials: true }))

// For cookies to work on heroku
app.enable('trust proxy');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(cookieParser('secrectcode'));

app.use(user.authMiddleware);

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Tasks application." });
});

require('./app/routes/task.routes.js')(app);
require('./app/routes/user.routes.js')(app);

app.set('port', (process.env.PORT || 5757));

// listen for requests
app.listen(app.get('port'), () => {
    console.log(`App is running on port ${app.get('port')}`);
});