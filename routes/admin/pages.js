var express = require('express');
var router = express.Router();

var Contacts = require('../../models/contacts').Contacts;
var Philosophies = require('../../models/philosophies').Philosophies;

var eLogger = require('../../lib/logger').eLogger;

var async = require('async');

var isLoggedInAdmin = require('../../lib/authenticated').isLoggedInAdmin;
router.use(isLoggedInAdmin);

// Storage
var multer = require('multer');
const storagePhilosophies = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/files/philosophies/');
  },
  filename: function (req, file, callback) {
    var secs = new Date().getTime();
    callback(null, secs + '_' + file.originalname.replace(/\s/g, '_'));
  }
});

router.get('/', function (req, res) {
  res.render('pages/admin/admin', {
    user: req.user
  });
});

router.get('/contacts', function (req, res) {
  Contacts.findOne({contacts_id: 1})
    .exec(function (err, contacts) {
      if (!err && contacts) {
        res.render('pages/admin/pages/admin-page-contacts', {
          user: req.user,
          contacts: contacts
        });
      } else {
        eLogger.error(err);
        res.redirect('/admin');
      }
    });
});

router.post('/contacts', function (req, res) {
  Contacts.findOne({contacts_id: 1}, function (err, contacts) {
    if (!err && contacts) {
      contacts.title1 = req.body.title1;
      contacts.title2 = req.body.title2;

      contacts.kyivAddress = req.body.kyivAddress;
      contacts.kyivPhone1 = req.body.kyivPhone1;
      contacts.kyivPhone2 = req.body.kyivPhone2;
      contacts.kyivTime1 = req.body.kyivTime1;
      contacts.kyivTime2 = req.body.kyivTime2;

      contacts.kharkivAddress = req.body.kharkivAddress;
      contacts.kharkivPhone1 = req.body.kharkivPhone1;
      contacts.kharkivPhone2 = req.body.kharkivPhone2;
      contacts.kharkivTime1 = req.body.kharkivTime1;
      contacts.kharkivTime2 = req.body.kharkivTime2;

      contacts.save(function (err, item) {
        if (err) {
          eLogger.error(err);
          res.render('pages/admin/pages/admin-page-contacts', {
            user: req.user,
            contacts: contacts,
            message: 'Ошибка сохранения страницы Контактов'
          });
        } else {
          res.redirect('/admin/pages');
        }
      });
    } else {
      eLogger.error(err);
      res.render('pages/admin/pages/admin-page-contacts', {
        user: req.user,
        message: 'Ошибка загрузки страницы Контактов'
      });
    }
  });
});

router.get('/philosophy', function (req, res) {
  Philosophies.findOne({philosophies_id: 1})
    .exec(function (err, philosophies) {
      if (!err && philosophies) {
        res.render('pages/admin/pages/admin-page-philosophy', {
          user: req.user,
          philosophies: philosophies
        });
      } else {
        eLogger.error(err);
        res.redirect('/admin');
      }
    });
});

router.post('/philosophy', function (req, res) {
  Philosophies.findOne({philosophies_id: 1})
    .exec(function (err, philosophies) {
      if (!err && philosophies) {
        var uploadImage = multer({storage: storagePhilosophies}).fields([
          {name: 'imageBg1', maxCount: 1},
          {name: 'imageBg2', maxCount: 1},
          {name: 'imageBg3', maxCount: 1},
          {name: 'imageBg4', maxCount: 1},
          {name: 'imageBg5', maxCount: 1},
          {name: 'imageBg5_1', maxCount: 1},
          {name: 'imageBg5_2', maxCount: 1},
          {name: 'imageBg5_3', maxCount: 1},
          {name: 'imageBg5_4', maxCount: 1},
          {name: 'imageBg6', maxCount: 1},
          {name: 'imageBg7', maxCount: 1},
          {name: 'imageBg8', maxCount: 1},
        ]);

        uploadImage(req, res, function (err) {
          if (err) {
            eLogger.error(err);
            res.render('pages/admin/pages/admin-page-philosophy', {
              user: req.user,
              philosophies: philosophies,
              message: 'Ошибка сохранения изображения'
            });
          } else {
            philosophies.title1 = req.body.title1;
            philosophies.subtitle1 = req.body.subtitle1;

            philosophies.title2 = req.body.title2;
            philosophies.text2 = req.body.text2;

            philosophies.title3 = req.body.title3;
            philosophies.text3 = req.body.text3;

            philosophies.title4 = req.body.title4;
            philosophies.text4 = req.body.text4;

            philosophies.title5 = req.body.title5;
            philosophies.subtitle5 = req.body.subtitle5;

            philosophies.title5_1 = req.body.title5_1;
            philosophies.subtitle5_1 = req.body.subtitle5_1;
            philosophies.text5_1 = req.body.text5_1;

            philosophies.title5_2 = req.body.title5_2;
            philosophies.subtitle5_2 = req.body.subtitle5_2;
            philosophies.text5_2 = req.body.text5_2;

            philosophies.title5_3 = req.body.title5_3;
            philosophies.subtitle5_3 = req.body.subtitle5_3;
            philosophies.text5_3 = req.body.text5_3;

            philosophies.title5_4 = req.body.title5_4;
            philosophies.subtitle5_4 = req.body.subtitle5_4;
            philosophies.text5_4 = req.body.text5_4;

            philosophies.title6 = req.body.title6;
            philosophies.text6_1 = req.body.text6_1;
            philosophies.text6_2 = req.body.text6_2;
            philosophies.text6_3 = req.body.text6_3;

            philosophies.title7 = req.body.title7;
            philosophies.text7_1 = req.body.text7_1;
            philosophies.text7_2 = req.body.text7_2;
            philosophies.text7_3 = req.body.text7_3;

            philosophies.title8 = req.body.title8;
            philosophies.btn8 = req.body.btn8;

            console.log(req.files);

            var newPath;
            if (req.files.imageBg1) {
              newPath = req.files.imageBg1[0].path;
              newPath = newPath.split('\\').join('/');
              philosophies.imageBg1 = newPath.replace('public', '');
            }
            if (req.files.imageBg2) {
              newPath = req.files.imageBg2[0].path;
              newPath = newPath.split('\\').join('/');
              philosophies.imageBg2 = newPath.replace('public', '');
            }
            if (req.files.imageBg3) {
              newPath = req.files.imageBg3[0].path;
              newPath = newPath.split('\\').join('/');
              philosophies.imageBg3 = newPath.replace('public', '');
            }
            if (req.files.imageBg4) {
              newPath = req.files.imageBg4[0].path;
              newPath = newPath.split('\\').join('/');
              philosophies.imageBg4 = newPath.replace('public', '');
            }
            if (req.files.imageBg5) {
              newPath = req.files.imageBg5[0].path;
              newPath = newPath.split('\\').join('/');
              philosophies.imageBg5 = newPath.replace('public', '');
            }
            if (req.files.imageBg5_1) {
              newPath = req.files.imageBg5_1[0].path;
              newPath = newPath.split('\\').join('/');
              philosophies.imageBg5_1 = newPath.replace('public', '');
            }
            if (req.files.imageBg5_2) {
              newPath = req.files.imageBg5_2[0].path;
              newPath = newPath.split('\\').join('/');
              philosophies.imageBg5_2 = newPath.replace('public', '');
            }
            if (req.files.imageBg5_3) {
              newPath = req.files.imageBg5_3[0].path;
              newPath = newPath.split('\\').join('/');
              philosophies.imageBg5_3 = newPath.replace('public', '');
            }
            if (req.files.imageBg5_4) {
              newPath = req.files.imageBg5_4[0].path;
              newPath = newPath.split('\\').join('/');
              philosophies.imageBg5_4 = newPath.replace('public', '');
            }
            if (req.files.imageBg6) {
              newPath = req.files.imageBg6[0].path;
              newPath = newPath.split('\\').join('/');
              philosophies.imageBg6 = newPath.replace('public', '');
            }
            if (req.files.imageBg7) {
              newPath = req.files.imageBg7[0].path;
              newPath = newPath.split('\\').join('/');
              philosophies.imageBg7 = newPath.replace('public', '');
            }
            if (req.files.imageBg8) {
              newPath = req.files.imageBg8[0].path;
              newPath = newPath.split('\\').join('/');
              philosophies.imageBg8 = newPath.replace('public', '');
            }

            philosophies.save(function (err, item) {
              if (err) {
                eLogger.error(err);
                res.render('pages/admin/pages/admin-page-philosophy', {
                  user: req.user,
                  philosophies: philosophies,
                  message: 'Ошибка сохранения страницы Философия'
                });
              } else {
                res.redirect('/admin/pages/philosophy');
              }
            });
          }
        });
      } else {
        eLogger.error(err);
        res.redirect('/admin/pages');
      }
    });
});

module.exports = router;