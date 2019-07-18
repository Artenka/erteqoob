var express = require('express');
var router = express.Router();

var Contacts = require('../../models/contacts').Contacts;

var eLogger = require('../../lib/logger').eLogger;

var async = require('async');

var isLoggedInAdmin = require('../../lib/authenticated').isLoggedInAdmin;
router.use(isLoggedInAdmin);

router.get('/', function (req, res) {
  res.render('pages/admin/admin', {
    user: req.user
  });
});

router.get('/contacts', function (req, res) {
  Contacts.findOne({contacts_id: 1})
    .exec(function (err, contacts) {
      if (!err && contacts) {
        res.render('pages/admin/admin-page-contacts', {
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
          res.render('pages/admin/admin-page-contacts', {
            user: req.user,
            contacts: contacts,
            message: 'Ошибка сохранения страницы Контактов'
          });
        } else {
          res.redirect('/admin/pages/contacts');
        }
      });
    } else {
      eLogger.error(err);
      res.render('pages/admin/admin-page-contacts', {
        user: req.user,
        message: 'Ошибка загрузки страницы Контактов'
      });
    }
  });
});

module.exports = router;