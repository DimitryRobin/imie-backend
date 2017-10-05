var express = require('express');
var router = express.Router();
var log4js = require('log4js');
var logger = log4js.getLogger();
var http = require('http');

router.get('/', function(req, res, next) {
    res.render('pollution', { place: 'pollution',  } );
});

module.exports = router;
