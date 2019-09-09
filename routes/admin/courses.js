var express = require('express');
var router = express.Router();

var Coursespages = require('../../models/courses/coursespages').Coursespages;
var Courses = require('../../models/courses/courses').Courses;

var eLogger = require('../../lib/logger').eLogger;

var async = require('async');

var isLoggedInAdmin = require('../../lib/authenticated').isLoggedInAdmin;
router.use(isLoggedInAdmin);

// Storage
var multer = require('multer');
const storageCoursespages = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/files/courses/');
  },
  filename   : function (req, file, callback) {
    var secs = new Date().getTime();
    callback(null, secs + '_' + file.originalname.replace(/\s/g, '_'));
  }
});

router.get('/page/:name', function (req, res) {
  Coursespages.findOne({name: req.params.name})
    .exec(function (err, coursespages) {
      if (!err && coursespages) {
        res.render('pages/admin/courses/admin-courses-page', {
          user: req.user,
          coursespages: coursespages
        });
      } else {
        eLogger.error(err);
        res.redirect('/admin');
      }
    });
});

router.post('/page/:name', function(req, res) {
  Coursespages.findOne({name: req.params.name}, function (err, coursespages) {
    if (!err && coursespages) {
      coursespages.title = req.body.title;
      coursespages.subtitle = req.body.subtitle;
      coursespages.about_title = req.body.about_title;
      coursespages.about_subtitle_1 = req.body.about_subtitle_1;
      coursespages.about_subtitle_2 = req.body.about_subtitle_2;
      coursespages.about_subtitle_3 = req.body.about_subtitle_3;

      coursespages.save(function (err, item) {
        if (err) {
          eLogger.error(err);
          req.session.err_message = 'Ошибка сохранения страницы';
          res.redirect('/admin/courses/page/' + req.params.name);
        } else {
          res.redirect('/admin/courses/page/' + req.params.name);
        }
      });
    } else {
      eLogger.error(err);
      req.session.err_message = 'Ошибка сохранения страницы';
      res.redirect('/admin' + req.params.id);
    }
  });
});


module.exports = router;