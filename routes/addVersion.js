var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();


var projectRootPath = path.resolve(__dirname, '../projects');
var srcRootPath = path.resolve(__dirname, '../window');




/* GET users listing. */
router.get('/', function(req, res, next) {

});

/* GET users listing. */
router.post('/', function(req, res, next) {
    var projectName = req.body.projectName;
    var version = req.body.version;
    var versionPath = path.join(projectRootPath, projectName, version);
    var isExists = fs.existsSync(versionPath);

    if (!isExists) {
        fs.mkdirSync(versionPath);
        fs.mkdirSync(path.join(versionPath, 'prd'));
        fs.mkdirSync(path.join(versionPath, 'prototype'));
        fs.mkdirSync(path.join(versionPath, 'visual'));
    }

    res.end('200');

});

module.exports = router;