var express = require('express');
var router = express.Router();
var log4js = require('log4js');
var logger = log4js.getLogger();
var http = require('http');

var url = 'http://samples.openweathermap.org/data/2.5/weather?q=Angers,fr&appid=55348de45dedcf1f3a556544df360bc7';
var fbResponse ='';

router.get('/', function(req, res, next) {
	http.get(url, function(res) {
	    var body = '';

	    res.on('data', function(data) {
	        body += data;
	    });

	    res.on('end', function() {
	        fbResponse = JSON.parse(body);
	        logger.info("Got a response: ", fbResponse);
	    });
	}).on('error', function(e) {
	      logger.error("Got an error: ", e);
	});
	res.render('weather', { data: fbResponse } );
});

module.exports = router;
