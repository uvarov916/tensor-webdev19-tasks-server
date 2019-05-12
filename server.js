const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const user = require('./app/controllers/user.controller.js');

// create express app
const app = express();

app.use(cors({origin: 'http://localhost:3000,https://tensor-webdev19-tasks-client.herokuapp.com/', credentials: true}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(cookieParser());

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
    res.json({"message": "Welcome to Tasks application."});
});

require('./app/routes/task.routes.js')(app);
require('./app/routes/user.routes.js')(app);

const port = process.env.PORT || 5757;

// listen for requests
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});