var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;

var projectRootPath = path.resolve(__dirname, '../test/projects');
var srcRootPath = path.resolve(__dirname, '../test/window');




/* GET users listing. */
router.get('/', function(req, res, next) {
    
});



/* GET users listing. */
router.post('/', function(req, res, next) {
    var projectName = req.body.projectName;
    var version = req.body.version;
    var type = req.body.type;
    var srcPath = req.body.srcPath;

    //srcPath = findPath(srcPath);

    //TODO
    srcPath = path.join(srcRootPath, '首页精准化v1.2', '【视觉】首页精准化v1.2', path.sep)


    //copy
    var projectPath = path.join(projectRootPath, projectName, version);

    var isExists = fs.existsSync(projectPath);

    if (!isExists) {
        fs.mkdirSync(projectPath);
    }


    var cmdStr = 'cp -R ' + srcPath + ' ' + projectPath + path.sep + type + path.sep;

    console.log(cmdStr);

    exec(cmdStr, function(err, stdout, stderr) {
        if (err) {
            console.error(stderr);
        } else {
            res.send('同步成功！');
        }
    });


    
});





function findPath(srcPath) {
    var realPath = srcPath;
    return realPath;
}


//copy('首页精准化', 1, 'visual', path.join(srcRootPath, '首页精准化v1.2', '【视觉】首页精准化v1.2', path.sep));


module.exports = router;