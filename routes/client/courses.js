var express = require('express');
var router = express.Router();

var Coursespages = require('../../models/courses/coursespages').Coursespages;
var Courses = require('../../models/courses/courses').Courses;

var eLogger = require('../../lib/logger').eLogger;

var async = require('async');


router.get('/', function(req, res, next) {
  res.render('pages/splash');
});

router.get('/beginner', function(req, res, next) {
  Coursespages.findOne({name: 'beginner'})
    .exec(function (err, coursespages) {
      if (!err && coursespages) {
        res.render('pages/lp/courses-beginner', {
          coursespages: coursespages
        });
      } else {
        eLogger.error(err);
        res.redirect('/');
      }
    });
});

router.get('/pro', function(req, res, next) {
  Coursespages.findOne({name: 'pro'})
    .exec(function (err, coursespages) {
      if (!err && coursespages) {
        res.render('pages/lp/courses-pro', {
          coursespages: coursespages
        });
      } else {
        eLogger.error(err);
        res.redirect('/');
      }
    });
});


module.exports = router;