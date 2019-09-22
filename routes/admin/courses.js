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
const storageCourses = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/files/courses/');
  },
  filename: function (req, file, callback) {
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

router.post('/page/:name', function (req, res) {
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

router.get('/', function (req, res) {
  res.render('pages/admin/courses/admin-courses-list', {
    user: req.user
  });
});


router.get('/list', function (req, res) {
  Courses.find({})
    .exec(function (err, courses) {
      if (!err) {
        var list = {
          data: []
        };

        courses.forEach(function (course) {
          list.data.push([
            course.courses_id,
            course.name,
            course.priority,
            course.courses_id,
          ]);
        });

        res.send(list);
      } else {
        eLogger.error(err);
        res.send({
          list: []
        });
      }
    });
});


router.get('/new', function (req, res) {
  res.render('pages/admin/courses/admin-courses-new', {
    user: req.user
  });
});

router.post('/new', function (req, res) {
  var uploadImage = multer({storage: storageCourses}).fields([
    // {name: 'map', maxCount: 1},
  ]);

  uploadImage(req, res, function (err) {
    if (err) {
      eLogger.error(err);
      res.render('pages/admin/courses/admin-courses-new', {
        user: req.user,
        message: 'Ошибка сохранения изображения'
      });
    } else {

      var courses = new Courses({});

      courses.name = req.body.name;
      courses.path = req.body.path;
      courses.course_type = req.body.course_type;
      courses.duration = req.body.duration;
      courses.difficulty = req.body.difficulty;
      courses.development = req.body.development;


      courses.save(function (err, item) {
        if (err) {
          eLogger.error(err);
          res.render('pages/admin/courses/admin-courses-new', {
            user: req.user,
            courses: courses,
            message: 'Ошибка сохранения салона'
          });
        } else {
          res.redirect('/admin/courses');
        }
      });
    }
  });
});

router.get('/actions', function (req, res) {
  Courses.find({courses_id: req.query.contacts}, function (err, courses) {
    if (!err && courses) {
      async.each(courses, function (course, callback) {

        if (req.query.action === "up") {
          course.priority += 1;
        } else if (req.query.action === "down") {
          if (course.priority > 0) {
            course.priority -= 1;
          }
        }

        course.save(function (err, item) {
          if (err) {
            eLogger.error(err);
            console.error(err);
          }
        });

        callback();
      }, function (err) {
        if (err) {
          res.send({result: 0});
        }
        res.send({result: 1});
      });
    } else {
      res.send({result: 0});
    }
  });
});


router.get('/:id', function (req, res) {
  Courses.findOne({courses_id: req.params.id})
    .exec(function (err, courses) {
      if (!err && courses) {
        res.render('pages/admin/courses/admin-courses-edit', {
          user: req.user,
          courses: courses
        });
      } else {
        eLogger.error(err);
        res.redirect('/admin/courses');
      }
    });
});

router.post('/:id/edit', function (req, res) {
  Courses.findOne({courses_id: req.params.id})
    .exec(function (err, courses) {
      if (!err && courses) {
        var uploadImage = multer({storage: storageCourses}).fields([
          {name: 'preview', maxCount: 1},
        ]);

        uploadImage(req, res, function (err) {
          if (err) {
            eLogger.error(err);
            res.render('pages/admin/courses/admin-courses-edit', {
              user: req.user,
              courses: courses,
              message: 'Ошибка сохранения изображения'
            });
          } else {
            courses.name = req.body.name;
            courses.path = req.body.path;
            courses.course_type = req.body.course_type;
            courses.duration = req.body.duration;
            courses.difficulty = req.body.difficulty;
            courses.development = req.body.development;


            var newPath;

            if (req.body.preview_deleted == 'false') {
              if (req.files.preview) {
                newPath = req.files.preview[0].path;
                newPath = newPath.split('\\').join('/');
                courses.preview = newPath.replace('public', '');
              } else {
                courses.preview = req.body.preview_path;
              }
            } else {
              courses.preview = '';
            }

            console.log(req.body);


            // courses.save(function (err, item) {
            //   if (err) {
            //     eLogger.error(err);
            //     res.render('pages/admin/courses/admin-courses-edit', {
            //       user: req.user,
            //       courses: courses,
            //       message: 'Ошибка сохранения салона'
            //     });
            //   } else {
            //     res.redirect('/admin/courses');
            //   }
            // });
          }
        });
      } else {
        eLogger.error(err);
        res.redirect('/admin/courses');
      }
    });
});

router.get('/:id/delete', function (req, res) {
  Courses.findOne({courses_id: req.params.id}, function (err, courses) {
    if (!err && courses) {
      courses.remove(function (err, item) {
        if (err) {
          eLogger.error(err);
          res.send({result: 0});
        } else {
          res.send({result: 1});
        }
      });
    }
  });
});


module.exports = router;