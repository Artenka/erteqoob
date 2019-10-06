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
  async.parallel([
    function (callback) {
      Courses.find({})
        .sort('-priority')
        .exec(function (err, courses) {
          if (!err && courses) {
            callback(null, courses);
          } else {
            callback(err, null);
          }
        });
    },
    function (callback) {
      Coursespages.findOne({name: 'beginner'})
        .exec(function (err, coursespages) {
          if (!err && coursespages) {
            callback(null, coursespages);
          } else {
            callback(err, null);
          }
        });
    }
  ], function (err, results) {
    if (err) {
      eLogger.error(err);
      res.redirect('/courses');
    } else {
      res.render('pages/lp/courses-beginner', {
        courses: results[0],
        coursespages: results[1]
      });
    }
  });
});

router.get('/pro', function(req, res, next) {
  async.parallel([
    function (callback) {
      Courses.find({})
        .sort('-priority')
        .exec(function (err, courses) {
          if (!err && courses) {
            callback(null, courses);
          } else {
            callback(err, null);
          }
        });
    },
    function (callback) {
      Coursespages.findOne({name: 'pro'})
        .exec(function (err, coursespages) {
          if (!err && coursespages) {
            callback(null, coursespages);
          } else {
            callback(err, null);
          }
        });
    }
  ], function (err, results) {
    if (err) {
      eLogger.error(err);
      res.redirect('/courses');
    } else {
      res.render('pages/lp/courses-pro', {
        courses: results[0],
        coursespages: results[1]
      });
    }
  });
});

router.get('/pro/gbw', function(req, res, next) {
  Courses.findOne({isgbw: 'true'})
    .exec(function (err, courses) {
      if (!err && courses) {
        res.render('pages/lp/gbw-base', {
          courses: courses
        });
      } else {
        eLogger.error(err);
        res.redirect('/courses');
      }
    });
});
router.get('/pro/gbw/grey/kiev', function(req, res, next) {
  Courses.findOne({isgbw: 'true'})
    .exec(function (err, courses) {
      if (!err && courses) {
        res.render('pages/lp/gbw-grey-kiev', {
          courses: courses
        });
      } else {
        eLogger.error(err);
        res.redirect('/courses');
      }
    });
});
router.get('/pro/gbw/grey/kharkiv', function(req, res, next) {
  Courses.findOne({isgbw: 'true'})
    .exec(function (err, courses) {
      if (!err && courses) {
        res.render('pages/lp/gbw-grey-kharkiv', {
          courses: courses
        });
      } else {
        eLogger.error(err);
        res.redirect('/courses');
      }
    });
});
router.get('/pro/gbw/black/kiev', function(req, res, next) {
  Courses.findOne({isgbw: 'true'})
    .exec(function (err, courses) {
      if (!err && courses) {
        res.render('pages/lp/gbw-black-kiev', {
          courses: courses
        });
      } else {
        eLogger.error(err);
        res.redirect('/courses');
      }
    });
});
router.get('/pro/gbw/black/kharkiv', function(req, res, next) {
  Courses.findOne({isgbw: 'true'})
    .exec(function (err, courses) {
      if (!err && courses) {
        res.render('pages/lp/gbw-black-kharkiv', {
          courses: courses
        });
      } else {
        eLogger.error(err);
        res.redirect('/courses');
      }
    });
});
router.get('/pro/gbw/white/kiev', function(req, res, next) {
  Courses.findOne({isgbw: 'true'})
    .exec(function (err, courses) {
      if (!err && courses) {
        res.render('pages/lp/gbw-white-kiev', {
          courses: courses
        });
      } else {
        eLogger.error(err);
        res.redirect('/courses');
      }
    });
});
router.get('/pro/gbw/white/kharkiv', function(req, res, next) {
  Courses.findOne({isgbw: 'true'})
    .exec(function (err, courses) {
      if (!err && courses) {
        res.render('pages/lp/gbw-white-kharkiv', {
          courses: courses
        });
      } else {
        eLogger.error(err);
        res.redirect('/courses');
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