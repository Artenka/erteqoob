var express = require('express');
var router = express.Router();

var Salonpages = require('../../models/salons/salonpages').Salonpages;
var Salons = require('../../models/salons/salons').Salons;

var eLogger = require('../../lib/logger').eLogger;

var async = require('async');


router.get('/', function(req, res) {
  var locals = {};

  async.parallel([
    function (callback) {
      Salons.find({})
        .sort('-priority')
        .exec(function (err, salons) {
          if (!err && salons) {
            callback(null, salons);
          } else {
            callback(err, null);
          }
        });
    },
    function (callback) {
      Salonpages.findOne({salonpages_id: 1})
        .exec(function (err, salonpages) {
          if (!err && salonpages) {
            callback(null, salonpages);
          } else {
            callback(err, null);
          }
        });
    }
  ], function (err, results) {
    if (err) {
      eLogger.error(err);
      res.redirect('/');
    } else {
      res.render('pages/salons', {
        salons: results[0],
        salonpages: results[1]
      });
    }
  });
});


router.get('/:path', function(req, res) {
  Salons.findOne({path: req.params.path})
    .exec(function (err, salons) {
      if (!err && salons) {
        res.render('pages/salons-single', {
          user: req.user,
          salons: salons
        });
      } else {
        eLogger.error(err);
        res.redirect('/salons');
      }
    });
});


module.exports = router;