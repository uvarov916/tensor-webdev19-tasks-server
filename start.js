const express = require('express');

// create express app
const app = express();

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Tasks application."});
});

// listen for requests
app.listen(5757, () => {
    console.log("App is running on port 5757");
});