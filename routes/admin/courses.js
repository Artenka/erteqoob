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
      courses.date = req.body.date;
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
        var uploadImage = multer({storage: storageCourses}).any();

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
            courses.date = req.body.date;
            courses.duration = req.body.duration;
            courses.difficulty = req.body.difficulty;
            courses.development = req.body.development;


            var newPath = '';

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



            var pagesArray = [];
            var kievBlocks = [];
            var kharkivBlocks = [];

            if (typeof req.body.pages !== 'undefined') {

              if (typeof req.body.pages.kiev !== 'undefined') var kievData = req.body.pages.kiev instanceof Array ? req.body.pages.kiev : [req.body.pages.kiev];
              if (typeof req.body.pages.kharkiv !== 'undefined') var kharkivData = req.body.pages.kharkiv instanceof Array ? req.body.pages.kharkiv : [req.body.pages.kharkiv];

              if (typeof kievData !== 'undefined' && kievData.length > 0) {
                kievData.forEach(function (item, index) {


                  // var kievBgPath;
                  // if (req.body['pages_kiev_'+ index +'_bg_deleted'] == 'false') {
                  //   kievBgPath = req.files.filter(function(e) {
                  //     return e.fieldname == 'pages_kiev_'+ index +'_bg';
                  //   });
                  //   if (typeof kievBgPath !== 'undefined' && kievBgPath.length > 0) {
                  //     kievBgPath = kievBgPath[0].path;
                  //     kievBgPath = kievBgPath.split('\\').join('/');
                  //     kievBgPath = kievBgPath.replace('public', '');
                  //   } else {
                  //     kievBgPath = req.body['pages_kiev_'+ index +'_bg_path'];
                  //   }
                  // }
                  //
                  // var kievItem1ImagePath;
                  // if (req.body['pages_kiev_'+ index +'_item_1_image_deleted'] == 'false') {
                  //   kievItem1ImagePath = req.files.filter(function(e) {
                  //     return e.fieldname == 'pages_kiev_'+ index +'_item_1_image';
                  //   });
                  //   if (typeof kievItem1ImagePath !== 'undefined' && kievItem1ImagePath.length > 0) {
                  //     kievItem1ImagePath = kievItem1ImagePath[0].path;
                  //     kievItem1ImagePath = kievItem1ImagePath.split('\\').join('/');
                  //     kievItem1ImagePath = kievItem1ImagePath.replace('public', '');
                  //   } else {
                  //     kievItem1ImagePath = req.body['pages_kiev_'+ index +'_item_1_image_path'];
                  //   }
                  // }
                  //
                  // var kievItem2ImagePath;
                  // if (req.body['pages_kiev_'+ index +'_item_2_image_deleted'] == 'false') {
                  //   kievItem2ImagePath = req.files.filter(function(e) {
                  //     return e.fieldname == 'pages_kiev_'+ index +'_item_2_image';
                  //   });
                  //   if (typeof kievItem2ImagePath !== 'undefined' && kievItem2ImagePath.length > 0) {
                  //     kievItem2ImagePath = kievItem2ImagePath[0].path;
                  //     kievItem2ImagePath = kievItem2ImagePath.split('\\').join('/');
                  //     kievItem2ImagePath = kievItem2ImagePath.replace('public', '');
                  //   } else {
                  //     kievItem2ImagePath = req.body['pages_kiev_'+ index +'_item_2_image_path'];
                  //   }
                  // }
                  //
                  // var kievItem3ImagePath;
                  // if (req.body['pages_kiev_'+ index +'_item_3_image_deleted'] == 'false') {
                  //   kievItem3ImagePath = req.files.filter(function(e) {
                  //     return e.fieldname == 'pages_kiev_'+ index +'_item_3_image';
                  //   });
                  //   if (typeof kievItem3ImagePath !== 'undefined' && kievItem3ImagePath.length > 0) {
                  //     kievItem3ImagePath = kievItem3ImagePath[0].path;
                  //     kievItem3ImagePath = kievItem3ImagePath.split('\\').join('/');
                  //     kievItem3ImagePath = kievItem3ImagePath.replace('public', '');
                  //   } else {
                  //     kievItem3ImagePath = req.body['pages_kiev_'+ index +'_item_3_image_path'];
                  //   }
                  // }
                  //
                  // var kievItem4ImagePath;
                  // if (req.body['pages_kiev_'+ index +'_item_4_image_deleted'] == 'false') {
                  //   kievItem4ImagePath = req.files.filter(function(e) {
                  //     return e.fieldname == 'pages_kiev_'+ index +'_item_4_image';
                  //   });
                  //   if (typeof kievItem4ImagePath !== 'undefined' && kievItem4ImagePath.length > 0) {
                  //     kievItem4ImagePath = kievItem4ImagePath[0].path;
                  //     kievItem4ImagePath = kievItem4ImagePath.split('\\').join('/');
                  //     kievItem4ImagePath = kievItem4ImagePath.replace('public', '');
                  //   } else {
                  //     kievItem4ImagePath = req.body['pages_kiev_'+ index +'_item_4_image_path'];
                  //   }
                  // }
                  //
                  // var kievItem5ImagePath;
                  // if (req.body['pages_kiev_'+ index +'_item_5_image_deleted'] == 'false') {
                  //   kievItem5ImagePath = req.files.filter(function(e) {
                  //     return e.fieldname == 'pages_kiev_'+ index +'_item_5_image';
                  //   });
                  //   if (typeof kievItem5ImagePath !== 'undefined' && kievItem5ImagePath.length > 0) {
                  //     kievItem5ImagePath = kievItem5ImagePath[0].path;
                  //     kievItem5ImagePath = kievItem5ImagePath.split('\\').join('/');
                  //     kievItem5ImagePath = kievItem5ImagePath.replace('public', '');
                  //   } else {
                  //     kievItem5ImagePath = req.body['pages_kiev_'+ index +'_item_5_image_path'];
                  //   }
                  // }
                  //
                  // var kievItem6ImagePath;
                  // if (req.body['pages_kiev_'+ index +'_item_6_image_deleted'] == 'false') {
                  //   kievItem6ImagePath = req.files.filter(function(e) {
                  //     return e.fieldname == 'pages_kiev_'+ index +'_item_6_image';
                  //   });
                  //   if (typeof kievItem6ImagePath !== 'undefined' && kievItem6ImagePath.length > 0) {
                  //     kievItem6ImagePath = kievItem6ImagePath[0].path;
                  //     kievItem6ImagePath = kievItem6ImagePath.split('\\').join('/');
                  //     kievItem6ImagePath = kievItem6ImagePath.replace('public', '');
                  //   } else {
                  //     kievItem6ImagePath = req.body['pages_kiev_'+ index +'_item_6_image_path'];
                  //   }
                  // }

                  kievBlocks.push({
                    block_type: preventUndefined(item.block_type),
                    title: preventUndefined(item.title),
                    subtitle: preventUndefined(item.subtitle),
                    bg: preventUndefined(returnImagePath(req.body, req.files, 'kiev', 'pages', 'bg', index)),
                    text: preventUndefined(item.text),
                    duration: preventUndefined(item.duration),
                    date: preventUndefined(item.date),
                    seats_current: preventUndefined(item.seats_current),
                    seats_total: preventUndefined(item.seats_total),
                    item_1_title: preventUndefined(item.item_1_title),
                    item_1_text: preventUndefined(item.item_1_text),
                    item_1_name: preventUndefined(item.item_1_name),
                    item_1_image: preventUndefined(returnImagePath(req.body, req.files, 'kiev', 'pages', 'item_1_image', index)),
                    item_2_title: preventUndefined(item.item_2_title),
                    item_2_text: preventUndefined(item.item_2_text),
                    item_2_name: preventUndefined(item.item_2_name),
                    item_2_image: preventUndefined(returnImagePath(req.body, req.files, 'kiev', 'pages', 'item_2_image', index)),
                    item_3_title: preventUndefined(item.item_3_title),
                    item_3_text: preventUndefined(item.item_3_text),
                    item_3_name: preventUndefined(item.item_3_name),
                    item_3_image: preventUndefined(returnImagePath(req.body, req.files, 'kiev', 'pages', 'item_3_image', index)),
                    item_4_title: preventUndefined(item.item_4_title),
                    item_4_text: preventUndefined(item.item_4_text),
                    item_4_image: preventUndefined(returnImagePath(req.body, req.files, 'kiev', 'pages', 'item_4_image', index)),
                    item_5_title: preventUndefined(item.item_5_title),
                    item_5_text: preventUndefined(item.item_5_text),
                    item_5_image: preventUndefined(returnImagePath(req.body, req.files, 'kiev', 'pages', 'item_5_image', index)),
                    item_6_title: preventUndefined(item.item_6_title),
                    item_6_text: preventUndefined(item.item_6_text),
                    item_6_image: preventUndefined(returnImagePath(req.body, req.files, 'kiev', 'pages', 'item_6_image', index)),
                    item_7_title: preventUndefined(item.item_7_title),
                    item_7_text: preventUndefined(item.item_7_text),
                    item_8_title: preventUndefined(item.item_8_title),
                    item_8_text: preventUndefined(item.item_8_text),
                    item_9_title: preventUndefined(item.item_9_title),
                    item_9_text: preventUndefined(item.item_9_text),
                    item_1_1_title: preventUndefined(item.item_1_1_title),
                    item_1_1_text: preventUndefined(item.item_1_1_text),
                    item_1_2_title: preventUndefined(item.item_1_2_title),
                    item_1_2_text: preventUndefined(item.item_1_2_text),
                    item_1_3_title: preventUndefined(item.item_1_3_title),
                    item_1_3_text: preventUndefined(item.item_1_3_text),
                    item_2_1_title: preventUndefined(item.item_2_1_title),
                    item_2_1_text: preventUndefined(item.item_2_1_text),
                    item_2_2_title: preventUndefined(item.item_2_2_title),
                    item_2_2_text: preventUndefined(item.item_2_2_text),
                    item_2_3_title: preventUndefined(item.item_2_3_title),
                    item_2_3_text: preventUndefined(item.item_2_3_text),
                    item_3_1_title: preventUndefined(item.item_3_1_title),
                    item_3_1_text: preventUndefined(item.item_3_1_text),
                    item_3_2_title: preventUndefined(item.item_3_2_title),
                    item_3_2_text: preventUndefined(item.item_3_2_text),
                    item_3_3_title: preventUndefined(item.item_3_3_title),
                    item_3_3_text: preventUndefined(item.item_3_3_text),
                    text_left: preventUndefined(item.text_left),
                    text_right: preventUndefined(item.text_right),
                    price: preventUndefined(item.price),
                    prepayment: preventUndefined(item.prepayment),
                    discount: preventUndefined(item.discount),
                    subtitle_1: preventUndefined(item.subtitle_1),
                    subtitle_2: preventUndefined(item.subtitle_2),
                    title_btn_1: preventUndefined(item.title_btn_1),
                    btn_1_text: preventUndefined(item.btn_1_text),
                    btn_1_link: preventUndefined(item.btn_1_link),
                    btn_2_text: preventUndefined(item.btn_2_text),
                    btn_2_link: preventUndefined(item.btn_2_link),
                    block_word_1: preventUndefined(item.block_word_1),
                    block_word_2: preventUndefined(item.block_word_2),
                    block_word_3: preventUndefined(item.block_word_3),
                  });
                });
              }

              if (typeof kharkivData !== 'undefined' && kharkivData.length > 0) {
                kharkivData.forEach(function (item, index) {
                  kharkivBlocks.push({
                    block_type: preventUndefined(item.block_type),
                    title: preventUndefined(item.title),
                    subtitle: preventUndefined(item.subtitle),
                    bg: preventUndefined(returnImagePath(req.body, req.files, 'kharkiv', 'pages', 'bg', index)),
                    text: preventUndefined(item.text),
                    duration: preventUndefined(item.duration),
                    date: preventUndefined(item.date),
                    seats_current: preventUndefined(item.seats_current),
                    seats_total: preventUndefined(item.seats_total),
                    item_1_title: preventUndefined(item.item_1_title),
                    item_1_text: preventUndefined(item.item_1_text),
                    item_1_name: preventUndefined(item.item_1_name),
                    item_1_image: preventUndefined(returnImagePath(req.body, req.files, 'kharkiv', 'pages', 'item_1_image', index)),
                    item_2_title: preventUndefined(item.item_2_title),
                    item_2_text: preventUndefined(item.item_2_text),
                    item_2_name: preventUndefined(item.item_2_name),
                    item_2_image: preventUndefined(returnImagePath(req.body, req.files, 'kharkiv', 'pages', 'item_2_image', index)),
                    item_3_title: preventUndefined(item.item_3_title),
                    item_3_text: preventUndefined(item.item_3_text),
                    item_3_name: preventUndefined(item.item_3_name),
                    item_3_image: preventUndefined(returnImagePath(req.body, req.files, 'kharkiv', 'pages', 'item_3_image', index)),
                    item_4_title: preventUndefined(item.item_4_title),
                    item_4_text: preventUndefined(item.item_4_text),
                    item_4_image: preventUndefined(returnImagePath(req.body, req.files, 'kharkiv', 'pages', 'item_4_image', index)),
                    item_5_title: preventUndefined(item.item_5_title),
                    item_5_text: preventUndefined(item.item_5_text),
                    item_5_image: preventUndefined(returnImagePath(req.body, req.files, 'kharkiv', 'pages', 'item_5_image', index)),
                    item_6_title: preventUndefined(item.item_6_title),
                    item_6_text: preventUndefined(item.item_6_text),
                    item_6_image: preventUndefined(returnImagePath(req.body, req.files, 'kharkiv', 'pages', 'item_6_image', index)),
                    item_7_title: preventUndefined(item.item_7_title),
                    item_7_text: preventUndefined(item.item_7_text),
                    item_8_title: preventUndefined(item.item_8_title),
                    item_8_text: preventUndefined(item.item_8_text),
                    item_9_title: preventUndefined(item.item_9_title),
                    item_9_text: preventUndefined(item.item_9_text),
                    item_1_1_title: preventUndefined(item.item_1_1_title),
                    item_1_1_text: preventUndefined(item.item_1_1_text),
                    item_1_2_title: preventUndefined(item.item_1_2_title),
                    item_1_2_text: preventUndefined(item.item_1_2_text),
                    item_1_3_title: preventUndefined(item.item_1_3_title),
                    item_1_3_text: preventUndefined(item.item_1_3_text),
                    item_2_1_title: preventUndefined(item.item_2_1_title),
                    item_2_1_text: preventUndefined(item.item_2_1_text),
                    item_2_2_title: preventUndefined(item.item_2_2_title),
                    item_2_2_text: preventUndefined(item.item_2_2_text),
                    item_2_3_title: preventUndefined(item.item_2_3_title),
                    item_2_3_text: preventUndefined(item.item_2_3_text),
                    item_3_1_title: preventUndefined(item.item_3_1_title),
                    item_3_1_text: preventUndefined(item.item_3_1_text),
                    item_3_2_title: preventUndefined(item.item_3_2_title),
                    item_3_2_text: preventUndefined(item.item_3_2_text),
                    item_3_3_title: preventUndefined(item.item_3_3_title),
                    item_3_3_text: preventUndefined(item.item_3_3_text),
                    text_left: preventUndefined(item.text_left),
                    text_right: preventUndefined(item.text_right),
                    price: preventUndefined(item.price),
                    prepayment: preventUndefined(item.prepayment),
                    discount: preventUndefined(item.discount),
                    subtitle_1: preventUndefined(item.subtitle_1),
                    subtitle_2: preventUndefined(item.subtitle_2),
                    title_btn_1: preventUndefined(item.title_btn_1),
                    btn_1_text: preventUndefined(item.btn_1_text),
                    btn_1_link: preventUndefined(item.btn_1_link),
                    btn_2_text: preventUndefined(item.btn_2_text),
                    btn_2_link: preventUndefined(item.btn_2_link),
                    block_word_1: preventUndefined(item.block_word_1),
                    block_word_2: preventUndefined(item.block_word_2),
                    block_word_3: preventUndefined(item.block_word_3),
                  });
                });
              }

            }

            console.log(kievBlocks);

            var kievPage = {
              city: 'kiev',
              blocks: kievBlocks
            };
            var kharkivPage = {
              city: 'kharkiv',
              blocks: kharkivBlocks
            };

            pagesArray.push(kievPage);
            pagesArray.push(kharkivPage);

            courses.pages = pagesArray;


            courses.save(function (err, item) {
              if (err) {
                eLogger.error(err);
                res.render('pages/admin/courses/admin-courses-edit', {
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

function returnImagePath(body, files, city, prefix, postfix, index) {
  var path;
  if (body[prefix +'_'+ city + '_'+ index +'_'+ postfix +'_deleted'] == 'false') {
    path = files.filter(function(e) {
      return e.fieldname == prefix +'_'+ city + '_'+ index +'_'+ postfix;
    });
    if (typeof path !== 'undefined' && path.length > 0) {
      path = path[0].path;
      path = path.split('\\').join('/');
      path = path.replace('public', '');
    } else {
      path = body[prefix +'_'+ city + '_'+ index +'_'+ postfix +'_path'];
    }
  }
  return path;
}

function preventUndefined(item) {
  return item === undefined ? "" : item;
}