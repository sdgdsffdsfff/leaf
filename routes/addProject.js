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
    var projectPath = path.join(projectRootPath, projectName);
    var isExists = fs.existsSync(projectPath);

    if (!isExists) {
        fs.mkdirSync(projectPath);
    }

    res.end('200');

});

module.exports = router;