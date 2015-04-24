var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');
var projectRootPath = path.resolve(__dirname, '../projects');

/* GET home page. */
router.get('/', function(req, res, next) {


    var projects =  fs.readdirSync(projectRootPath);
    projects = projects.filter(function(el) {
        var stats = fs.statSync(path.join(projectRootPath,el));
        return stats.isDirectory();
    });

  res.render('index', { title: 'projects',projects: projects});
});


// get project page
router.get('/:project', function(req, res, next) {
    var project = req.params.project;

    var versions =  fs.readdirSync(path.join(projectRootPath,project));
    versions = versions.filter(function(el) {
        var stats = fs.statSync(path.join(projectRootPath,project,el));
        return stats.isDirectory();
    });

    res.render('index', {
        title: 'versions',
        project:project,
        versions:versions
    });
});



// get project page
router.get('/:project/:version', function(req, res, next) {
    var version = req.params.version;
    var project = req.params.project;
    if(version === 'prd' || version === 'prototype' || version === 'visual'){
        next();
    }
    var tmpData = {
        "title" : project,
        "product" : project,
        "version" : version,
        "versions" : [{
            "name" : "v0.1",
            "date" : "xxxx"
        },{
            "name" : "v0.2",
            "date" : "xxxxx"
        }],
        "prd" : {
            "mapping" : "\\\\192.168.8.8\\CrossShare\\首页精准化v1.2\\【PRD】首页精准化v1.2.docx",
            "time" : "xxxx"
        },
        "prototype" : {
            "mapping" : "smb://192.168.8.8/CrossShare/首页精准化v1.2/【交互】首页精准化v1.2",
            "time" : "xxxxx"
        },
        "visual" : {
            "mapping" : "smb://192.168.8.8/CrossShare/首页精准化v1.2/【视觉】首页精准化v1.2",
            "time" : "xxxxx"
        }
    }

    //TODO
    //测试数据
    if (project === '商品详情页') {
        tmpData = {
            "title": project,
            "product": project,
            "version": version,
            "versions": [{
                "name": "v0.1",
                "date": "xxxx"
            }, {
                "name": "v0.2",
                "date": "xxxxx"
            }],
            "prd": {
                "mapping": "\\\\192.168.8.8\\CrossShare\\商品详情页\\【PRD】无线商详页需求文档.docx",
                "time": "xxxx"
            },
            "prototype": {
                "mapping": "smb://192.168.8.8/CrossShare/商品详情页/商详交互",
                "time": "xxxxx"
            },
            "visual": {
                "mapping": "smb://192.168.8.8/CrossShare/商品详情页/商详视觉",
                "time": "xxxxx"
            }
        }
    }

    res.render('detail', tmpData);
});


// get prd page
router.get('/:project/:version?/prd', function(req, res, next) {
  var version = req.params.version;
  var project = req.params.project;
  if(!project){return;}
  res.render('index', { title: 'prd' });
});

// get prototype page
router.get('/:project/:version?/prototype', function(req, res, next) {
    var version = req.params.version;
    var project = req.params.project;
    var host = req.headers.host;
    var _path = path.join(__dirname,'../projects/' + project + '/');

    // TODO : 这里的version应该由数据库提供
    if(!version){
        var urls = fs.readdirSync(_path);
        urls = urls.filter(function(el){
            var stats = fs.statSync(path.join(_path,el));
            return stats.isDirectory();
        });

        urls.sort(function(url){
            var stats = fs.statSync(path.join(_path,el));
            return  stats.mtime;
        });

        if(urls.length > 0){
            version = urls[0];   
        }else{
            version = null;
        }
    }

    if(!version){res.end();return;}


    var url = 'http://'+host + '/projects/' + project + '/' + version + '/prototype/';
    res.redirect(302, url);
});

// get visual page
router.get('/:project/:version?/visual', function(req, res, next) {

  var version = req.params.version;
  var project = req.params.project;
  var host = req.headers.host;

  var _path = path.join(__dirname,'../projects/' + project  +'/' + version + '/visual/');


  fs.exists(_path,function(exists){
    if(!exists){res.end('ouch!!!');return;}
    var images =  fs.readdirSync(_path);
    images = images.filter(function(el){
        var extname = path.extname(el);
        return ( extname === '.png' || extname === '.jpg' || extname === '.jpeg' || extname === '.gif')
    });
    
    images = images.map(function(el){
        return {
            'src' :  'http://'+host + '/projects/' + project + '/' + version + '/visual/' + el,
            'name' : el
        }
    });

    var data = {
        title : "visual",
        images : images
    }

    res.render('visual', data);

  })
});




module.exports = router;
