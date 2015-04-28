var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();
var Project = require('../db/project');

var projectRootPath = path.resolve(__dirname, '../projects');
var srcRootPath = path.resolve(__dirname, '../window');




router.get('/', function(req, res, next) {

});

// 1.以projectName为唯一标识，不允许重复
// 2.先查询projectName是否存在
// 3.存在--返回项目已经存在，并修复文件目录
// 4.不存在--先插入数据库，成功，新建文件目录
router.post('/', function(req, res, next) {
    var projectName = req.body.projectName;
    var projectPath = path.join(projectRootPath, projectName);


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
                    description: projectPath,
                    versions:[]
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
                        res.status('200');
                        res.end();
                    }
                });

            }

        }

    });

});

module.exports = router;