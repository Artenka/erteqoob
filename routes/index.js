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
router.get('/splash', function(req, res, next) {
  res.render('pages/splash');
});
router.get('/salons', function(req, res, next) {
  res.render('pages/salons');
});
router.get('/contacts', function(req, res, next) {
  res.render('pages/contacts');
});


router.get('/lp', function(req, res, next) {
  res.render('pages/lp/home');
});

router.get('/sp1/expired', function(req, res, next) {
  res.render('pages/lp/sp-1-expired');
});
router.get('/sp1/thankyou', function(req, res, next) {
  res.render('pages/lp/sp-1-thankyou');
});
router.get('/sp1/thankyou/2', function(req, res, next) {
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

router.get('/base/kiev', function(req, res, next) {
  res.render('pages/lp/base-kiev');
});
router.get('/base/kharkiv', function(req, res, next) {
  res.render('pages/lp/base-kharkiv');
});

router.get('/qualification', function(req, res, next) {
  res.render('pages/lp/qualification');
});

module.exports = router;
