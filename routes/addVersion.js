var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();
var Project = require('../db/project');


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


    Project.findByName(projectName, function(err, obj) {
        if (err) {
            res.status('404');
            res.end('数据库错误');
        } else {
            if (obj) {
                var versions = obj.versions || [];
                var oldIndex = -1;
                var isOld = versions.some(function(element, index, array) {
                    if (element.name === version) {
                        oldIndex = index;
                        return true;
                    } else {
                        return false;
                    }
                });

                if (isOld) {
                    res.status('404');
                    res.end('版本已存在');
                } else {
                    versions.push({
                        name: version,
                        date: new Date()
                    });
               

                    Project.addVersion(projectName, versions, function(err, obj) {
                        if (err) {
                            res.status('404');
                            res.end('数据库错误');
                        } else {

                            var isExists = fs.existsSync(versionPath);

                            if (!isExists) {
                                fs.mkdirSync(versionPath);
                                fs.mkdirSync(path.join(versionPath, 'prd'));
                                fs.mkdirSync(path.join(versionPath, 'prototype'));
                                fs.mkdirSync(path.join(versionPath, 'visual'));
                            }

                            res.status('200');
                            res.end();
                        }
                    });

                }
            } else {
                res.status('404');
                res.end('数据库错误');
            }

        }

    });









});

module.exports = router;