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

module.exports = router;
