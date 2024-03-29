var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  = require('multer')

var routes = require('./routes/index');
var copy = require('./routes/copy');
var addProject = require('./routes/addProject');
var addVersion = require('./routes/addVersion');
var listProject = require('./routes/listProject');

var config;

try{
  config = require('./config.json');
}catch(e){
  console.log(e)
  config = {};
}

var fs = require('fs');
var path = require('path');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(multer());

app.use(express.static(path.join(__dirname, 'public')));
app.use("/projects", express.static(__dirname + "/projects"));


app.use('/', routes);
app.use('/copy', copy);
app.use('/addProject', addProject);
app.use('/addVersion', addVersion);
app.use('/listProject', listProject);

// judge projects is exist . if not mkdir projects folder
fs.exists(path.join(__dirname,'/projects'),function(exists){
  if(!exists){
    fs.mkdir('projects',function(){
    });
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


var mongoose = require('mongoose');

console.log(config)

if(config.mongodb){
  console.log(config.mongodb);
  mongoose.connect(config.mongodb);
}else{
  mongoose.connect('mongodb://leaf:leaf@192.168.112.94:27017/leaf');
}



module.exports = app;
