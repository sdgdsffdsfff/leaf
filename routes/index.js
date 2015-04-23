var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Leaf' });
});

// get project page
router.get('/:project/:version?', function(req, res, next) {
    var version = req.params.version;
    if(version === 'prd' || version === 'prototype' || version === 'visual'){
        next();
    }
    var tmpData = {
        "title" : "测死项目",
        "product" : "测试",
        "version" : "v0.1",
        "versions" : [{
            "name" : "v0.1",
            "date" : "xxxx"
        },{
            "name" : "v0.2",
            "date" : "xxxxx"
        }],
        "prd" : {
            "mapping" : "http://xxxxxx",
            "time" : "xxxx"
        },
        "prototype" : {
            "mapping" : "http://xxxxx",
            "time" : "xxxxx"
        },
        "visual" : {
            "mapping" : "http://xxxxxx",
            "time" : "xxxxx"
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
        return 'http://'+host + '/projects/' + project + '/' + version + '/visual/' + el;
    });

    var data = {
        title : "visual",
        images : images
    }

    res.render('visual', data);

  })
});




module.exports = router;
