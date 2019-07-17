var express = require('express');
var router = express.Router();

var isLoggedInAdmin = require('../../lib/authenticated').isLoggedInAdmin;
router.use(isLoggedInAdmin);

router.get('/', function (req, res) {
  res.render('pages/admin/admin');
});

module.exports = router;