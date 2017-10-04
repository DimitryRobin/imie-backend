var express = require('express');
var router = express.Router();
var log4js = require('log4js');
var logger = log4js.getLogger();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

module.exports = router;
