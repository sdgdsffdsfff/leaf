var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();
var Project = require('../db/project');
var Version = require('../db/version');


var projectRootPath = path.resolve(__dirname, '../projects');




router.get('/', function(req, res, next) {

});

// 1.以projectName为唯一标识，不允许重复
// 2.先查询projectName是否存在
// 3.存在--返回项目已经存在，并修复文件目录
// 4.不存在--先插入数据库，成功，新建文件目录
router.post('/', function(req, res, next) {
    var projectName = req.body.projectName;
    var description = req.body.description;
    var projectPath = path.join(projectRootPath, projectName);
    var versionPath = path.join(projectPath, '1');


    Project.findByName(projectName, function(err, obj) {
        if (err) {
            res.status('404');
            res.end('数据库错误');
        } else {
            if (obj) {
                var isExists = fs.existsSync(projectPath);

                if (!isExists) {
                    fs.mkdirSync(projectPath);
                }
                res.status('404');
                res.end('项目已存在!');
            } else {
                var project = new Project({
                    name: projectName,
                    description: description,
                    updateTime: new Date(),
                    versions: []
                });
                project.save(function(err, project) {
                    if (err) {
                        res.status('404');
                        res.end('数据库错误');
                    } else {
                        var isExists = fs.existsSync(projectPath);

                        if (!isExists) {
                            fs.mkdirSync(projectPath);
                        }

                        var newVersion = new Version({
                            name: '1',
                            date: new Date(),
                            project: project
                        });
                        newVersion.save(function(err, ver) {
                            if (err) {
                                res.status('404');
                                res.end('数据库错误');
                            } else {
                                project.versions.push(ver);
                                project.updateTime = new Date();
                                project.save(function(err, pro) {
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
                        });

                    }
                });

            }

        }

    });

});

module.exports = router;