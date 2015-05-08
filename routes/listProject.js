var fs = require('fs');
var express = require('express');
var router = express.Router();
var Project = require('../db/project');


router.get('/', function (req, res, next) {

});


router.post('/', function (req, res, next) {
    Project.find({}, function (err, projects) {
        if (err) {
            projects = [];
        }
        res.send(
            projects
        );
    });

});

module.exports = router;