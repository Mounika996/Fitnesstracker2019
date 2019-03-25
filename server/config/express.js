var express = require('express');
var glob = require('glob');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var multer  = require("multer");
var session = require("express-session");
var config = require('./config');
var cors = require('cors');
// var pem = require('pem-master')

module.exports = function(app) {
  app.use(bodyParser.json({
    limit: "100MB"
  }));
  app.use(bodyParser.urlencoded({
    limit: "100MB",
    extended: true
  }));
  //---------------todo-start----------------//
  app.use(function (req, res, next) {

  //    res.header("X-Frame-Options", "iframe");

      res.header("Access-Control-Allow-Origin", '*');

      res.header('Access-Control-Allow-Methods', 'GET, POST');

     res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, viewerTZOffset");
      
      res.header("Access-Control-Allow-Credentials", true);

  //     if (req.url == "/") {
  //         // usertracker.log(req.ip)
  //     }

      next();
  });
  //---------------todo-end----------------//
  app.use(cookieParser());
  app.use(compress());
  app.use(methodOverride());
  app.use(multer({dest: "./public/uploads/"}));
  app.use(cors());

  app.use(session({
      secret: 'keyboard cat',
      resave: true,
      saveUninitialized: true,
      name: 'abababababababab',
      cookie: {
          secure: true,
          secret: true,
          expires: false,
          maxAge: 1000 * 60 * 60 * 10
      }
  }));
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'ejs');

  /*s
  var models = glob.sync(config.root + '/app/models/*.js');
  models.forEach(function (model) {
    require(model);
  });
  */

  var controllers = glob.sync(config.root + '/app/controllers/common/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  controllers = glob.sync(config.root + '/app/controllers/user/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use(function (err, req, res, next) {
    console.log(err);
    console.log(req.url);
    console.log('----------------------------');
    res.status(err.status || 500);
    res.send('404 error');
  // res.render('error', {
  //   message: err.message,
  //   status: err.status,
  //   error: {},
  //   title: 'error'
  // });
  });

};
