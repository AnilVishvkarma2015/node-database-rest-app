
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const dbSession = require('./dbConnection');
const services = require('./services');

const port = 9002;
var app = express();
app.use(bodyParser.json());
const dbobject = dbSession.getDBSession(); // Initialize Db Connection...
// services.createTable();

setTimeout(function () {
    services.createCollegeTable();
    services.createCourseTable();
}, 3000);

app.route('/').get(function (req, res) {
    console.log('Get Home - starts');
    res.status(200).send("Welcome to College Record Application");
    console.log('Get Home - ends');
});

app.route('/getcollegelist').get(function (req, res) {
    console.log('Get Colleges - starts');
    services.getCollegeList().then(colleges => {
        res.status(200).send(colleges);
    }).catch(err => {
        res.status(500).send(err.message);
    });
    console.log('Get Colleges - ends');
});

app.route('/postcollege').post(function (req, res) {
    console.log('Post College - starts');
    var collegeObject = req.body.collegeData;

    services.saveCollege(collegeObject)
        .then(response => {
            services.saveCourse(collegeObject)
                .then(resp => {
                    res.status(200).send(resp);
                })
        }).catch(err => {
            res.status(500).send(err.message);
        });
    console.log('Post College - ends');
});

app.listen(port, function () {
    console.log('Server is running now. Address http://localhost:%s', port);
});

