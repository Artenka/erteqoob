var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('pages/home');
});
router.get('/philosophy', function(req, res, next) {
  res.render('pages/philosophy');
});
router.get('/academy', function(req, res, next) {
  res.render('pages/academy');
});
router.get('/collections', function(req, res, next) {
  res.render('pages/collections');
});
router.get('/article', function(req, res, next) {
  res.render('pages/article');
});
router.get('/blog', function(req, res, next) {
  res.render('pages/blog');
});
router.get('/courses', function(req, res, next) {
  res.render('pages/splash');
});
router.get('/salons', function(req, res, next) {
  res.render('pages/salons');
});
router.get('/contacts', function(req, res, next) {
  res.render('pages/contacts');
});


router.get('/courses/beginner', function(req, res, next) {
  res.render('pages/lp/courses-beginner');
});
router.get('/courses/pro', function(req, res, next) {
  res.render('pages/lp/courses-pro');
});

router.get('/lp', function(req, res, next) {
  res.render('pages/lp/home');
});

router.get('/courses/expired', function(req, res, next) {
  res.render('pages/lp/sp-1-expired');
});
router.get('/courses/thankyou', function(req, res, next) {
  res.render('pages/lp/sp-1-thankyou');
});
router.get('/courses/thankyou/2', function(req, res, next) {
  res.render('pages/lp/sp-1-thankyou-2');
});

router.get('/sp/kiev', function(req, res, next) {
  res.render('pages/lp/sp-kiev');
});
router.get('/sp/kharkiv', function(req, res, next) {
  res.render('pages/lp/sp-kharkiv');
});
router.get('/sp1/kiev', function(req, res, next) {
  res.render('pages/lp/sp1-kiev');
});
router.get('/sp1/kharkiv', function(req, res, next) {
  res.render('pages/lp/sp1-kharkiv');
});

router.get('/webinar', function(req, res, next) {
  res.render('pages/lp/webinar');
});

router.get('/courses/beginner/base/kiev', function(req, res, next) {
  res.render('pages/lp/base-kiev');
});
router.get('/courses/beginner/base/kharkiv', function(req, res, next) {
  res.render('pages/lp/base-kharkiv');
});

router.get('/courses/beginner/qualification/kiev', function(req, res, next) {
  res.render('pages/lp/qualification-kiev');
});
router.get('/courses/beginner/qualification/kharkiv', function(req, res, next) {
  res.render('pages/lp/qualification-kharkiv');
});

router.get('/courses/pro/adaptation/kiev', function(req, res, next) {
  res.render('pages/lp/adaptation-kiev');
});
router.get('/courses/pro/adaptation/kharkiv', function(req, res, next) {
  res.render('pages/lp/adaptation-kharkiv');
});

router.get('/courses/pro/man-innovations/kiev', function(req, res, next) {
  res.render('pages/lp/man-innovations-kiev');
});
router.get('/courses/pro/man-innovations/kharkiv', function(req, res, next) {
  res.render('pages/lp/man-innovations-kharkiv');
});

router.get('/courses/pro/salon-innovations/kiev', function(req, res, next) {
  res.render('pages/lp/salon-innovations-kiev');
});
router.get('/courses/pro/salon-innovations/kharkiv', function(req, res, next) {
  res.render('pages/lp/salon-innovations-kharkiv');
});

router.get('/courses/pro/gbw', function(req, res, next) {
  res.render('pages/lp/gbw-base');
});
router.get('/courses/pro/gbw/grey/kiev', function(req, res, next) {
  res.render('pages/lp/gbw-grey-kiev');
});
router.get('/courses/pro/gbw/grey/kharkiv', function(req, res, next) {
  res.render('pages/lp/gbw-grey-kharkiv');
});
router.get('/courses/pro/gbw/black/kiev', function(req, res, next) {
  res.render('pages/lp/gbw-black-kiev');
});
router.get('/courses/pro/gbw/black/kharkiv', function(req, res, next) {
  res.render('pages/lp/gbw-black-kharkiv');
});
router.get('/courses/pro/gbw/white/kiev', function(req, res, next) {
  res.render('pages/lp/gbw-white-kiev');
});
router.get('/courses/pro/gbw/white/kharkiv', function(req, res, next) {
  res.render('pages/lp/gbw-white-kharkiv');
});


router.get('/in-development', function(req, res, next) {
  res.render('pages/indev');
});


module.exports = router;
