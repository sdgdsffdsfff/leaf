var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;

var projectRootPath = path.resolve(__dirname, '../projects');
var srcRootPath = path.resolve(__dirname, '../window');




/* GET users listing. */
router.get('/', function(req, res, next) {

});



/* GET users listing. */
router.post('/', function(req, res, next) {
    try {
        var projectName = req.body.projectName;
        var version = req.body.version;
        var type = req.body.type;
        var srcPath = req.body.srcPath;


        function findPath(srcPath) {
            var realPath = srcPath;
            if (srcPath.split('CrossShare/').length > 1) {
                realPath = srcPath.split('CrossShare/')[1];
            }
            return realPath;
        }



        srcPath = findPath(srcPath);

        // console.log('源目录=', srcPath);



        //TODO
        srcPath = path.join(srcRootPath, srcPath)


        if (!fs.existsSync(srcPath)) {
            res.send('error');
            return;
        }


        var file = fs.statSync(srcPath);

        if (file.isDirectory()) {
            srcPath = path.join(srcPath, path.sep);
        }

        // console.log('处理后=', srcPath)
        //copy
        var projectPath = path.join(projectRootPath, projectName, version);

        var isExists = fs.existsSync(projectPath);

        if (!isExists) {
            fs.mkdirSync(projectPath);
            fs.mkdirSync(path.join(projectPath, path.sep, 'prd'));
            fs.mkdirSync(path.join(projectPath, path.sep, 'prototype'));
            fs.mkdirSync(path.join(projectPath, path.sep, 'visual'));
        }

        if(!fs.existsSync(path.join(projectPath, path.sep, 'prd'))){
            fs.mkdirSync(path.join(projectPath, path.sep, 'prd'));
        }


        var cmdStr = 'cp -R ' + srcPath + ' ' + projectPath + path.sep + type + path.sep;

        // console.log('命令=', cmdStr);

        exec(cmdStr, function(err, stdout, stderr) {
            if (err) {
                console.error(stderr);
                res.send('error');
            } else {
                res.send('同步成功！');
            }
        });

    } catch (e) {
        console.error(e);
        res.send('error');
    }



});

module.exports = router;