var express = require('express');
var router = express.Router();

var Salons = require('../../models/salons/salons').Salons;

var eLogger = require('../../lib/logger').eLogger;

var async = require('async');

var isLoggedInAdmin = require('../../lib/authenticated').isLoggedInAdmin;
router.use(isLoggedInAdmin);


router.get('/', function (req, res) {
  Salons.findOne({salons_id: 1})
    .exec(function (err, salons) {
      if (!err && salons) {
        res.render('pages/admin/salons/admin-salons-page', {
          user: req.user,
          salons: salons
        });
      } else {
        eLogger.error(err);
        res.redirect('/admin');
      }
    });
});

router.post('/', function(req, res) {
  Salons.findOne({salons_id: 1}, function (err, salons) {
    if (!err && salons) {
      salons.title = req.body.title;
      salons.subtitle = req.body.subtitle;

      salons.save(function (err, item) {
        if (err) {
          eLogger.error(err);
          req.session.err_message = 'Ошибка сохранения страницы';
          res.redirect('/admin/salons' + req.params.id);
        } else {
          res.redirect('/admin/salons');
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