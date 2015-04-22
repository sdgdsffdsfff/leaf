var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

var projectRootPath = path.resolve(__dirname, '../test/projects');
var srcRootPath = path.resolve(__dirname, '../test/window');


function copy(projectName, version, type, srcPath) {
    var projectPath = path.join(projectRootPath, projectName, version);

    var isExists = fs.existsSync(projectPath);

    if (!isExists) {
        fs.mkdirSync(projectPath);
    }


    var cmdStr = 'cp -R ' + srcPath + ' ' + projectPath + path.sep + type + path.sep;


    exec(cmdStr, function (err, stdout, stderr) {
        if (err) {
            console.error(stderr);
        } else {
            console.log(stdout);
        }
    });

}


//TODO  test  测试copy

copy('首页精准化', 1, 'visual', path.join(srcRootPath, '首页精准化v1.2', '【视觉】首页精准化v1.2', path.sep));


