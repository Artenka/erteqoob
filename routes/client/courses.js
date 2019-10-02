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

router.get('/:difficulty/:path', function(req, res, next) {
  res.redirect('/courses/'+ req.params.difficulty +'/'+ req.params.path +'/kiev');
});

router.get('/:difficulty/:path/:city', function(req, res) {
  Courses.findOne({difficulty: req.params.difficulty, path: req.params.path})
    .exec(function (err, courses) {
      if (!err && courses && (req.params.city === 'kiev' || req.params.city === 'kharkiv')) {
        res.render('pages/courses-single', {
          user: req.user,
          city: req.params.city,
          courses: courses
        });
      } else {
        eLogger.error(err);
        res.redirect('/courses');
      }
    });
});


module.exports = router;