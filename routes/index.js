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
    res.render('index', { title: 'project' });
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
