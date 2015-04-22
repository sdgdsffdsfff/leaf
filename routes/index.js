var express = require('express');
var router = express.Router();

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
  res.render('index', { title: 'prd' });
});


// get prototype page
router.get('/:project/:version?/prototype', function(req, res, next) {
  res.render('index', { title: 'prototype' });
});


// get visual page
router.get('/:project/:version?/visual', function(req, res, next) {
  res.render('index', { title: 'visual' });
});

module.exports = router;
