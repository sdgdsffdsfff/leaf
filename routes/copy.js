var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;
var Version = require('../db/version');
var Project = require('../db/project');
var nodeImages = require("images");

var projectRootPath = path.resolve(__dirname, '../projects');
var srcRootPath = path.resolve(__dirname, '../window');


/* GET users listing. */
router.get('/', function (req, res, next) {

});


function update(projectName, type, version, newContent, cb) {

    switch (type) {
        case 'prd':
            Version.updatePrd(version, newContent, cb);
            break;
        case 'prototype':
            Version.updatePrototype(version, newContent, cb);
            break;
        case 'visual':
            Version.updateVisual(version, newContent, cb);
            break;
    }

    Project.findByName(projectName, function (err, obj) {
        if (obj) {
            obj.updateTime = new Date();
            obj.save();
        }
    });
}


/* GET users listing. */
router.post('/', function (req, res, next) {
    try {
        var projectName = req.body.projectName;
        var version = req.body.version;
        var type = req.body.type;
        var srcPath = req.body.srcPath;


        //TDTO 处理数据库逻辑
        //是否需要恢复文件目录？


        console.log(srcPath, srcRootPath);


        var mountCmdStr = 'echo liubing | sudo mount -t cifs -o username=liubing2,password=test1064=,ro ' + srcPath + ' ' + srcRootPath;

        // console.log('命令=', cmdStr);

        exec(mountCmdStr, function (err, stdout, stderr) {
            if (err) {
                console.error(stderr);
                return;
            } else {
                console.log(stdout);
                return;
            }
        });

        // console.log('源目录=', srcPath);


        if (!fs.existsSync(srcPath)) {
            res.send('error');
            return;
        }


        var file = fs.statSync(srcPath);

        if (file.isDirectory()) {
            srcPath = path.join(srcPath, '*');
        }

        // console.log('处理后=', srcPath)
        //copy
        var projectPath = path.join(projectRootPath, projectName, version);

        var isExists = fs.existsSync(projectPath);

        if (!isExists) {
            fs.mkdirSync(projectPath);
            fs.mkdirSync(path.join(projectPath, 'prd'));
            fs.mkdirSync(path.join(projectPath, 'prototype'));
            fs.mkdirSync(path.join(projectPath, 'visual'));
        }

        if (!fs.existsSync(path.join(projectPath, 'prd'))) {
            fs.mkdirSync(path.join(projectPath, 'prd'));
        }


        var cmdStr = 'cp -R ' + srcPath + ' ' + projectPath + path.sep + type + path.sep;

        // console.log('命令=', cmdStr);

        exec(cmdStr, function (err, stdout, stderr) {
            if (err) {
                console.error(stderr);
                res.send('error');
            } else {
                if (type === 'visual') {
                    var _path = path.join(projectPath, 'visual');
                    fs.exists(_path, function (exists) {
                        if (!exists) {
                            return;
                        }
                        var images = fs.readdirSync(_path);
                        images = images.filter(function (el) {
                            var extname = path.extname(el);
                            return (extname === '.png' || extname === '.jpg' || extname === '.jpeg' || extname === '.gif')
                        });

                        images.map(function (el) {
                            var imagePath = path.join(_path, el);
                            var newName = path.basename(el, path.extname(el)) + '_min' + path.extname(el);
                            nodeImages(imagePath)
                                .size(500)
                                .save(path.join(_path, newName));
                            return el;
                        });
                    });
                }


                update(projectName, type, version, {
                    mapping: req.body.srcPath,
                    time: new Date()
                }, function (err, ver) {
                    res.send('同步成功！');
                });

            }
        });

    } catch (e) {
        console.error(e);
        res.send('error');
    }


});

module.exports = router;