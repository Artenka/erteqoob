var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('pages/home');
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

module.exports = router;
