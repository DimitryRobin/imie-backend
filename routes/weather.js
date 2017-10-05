var express = require('express');
var router = express.Router();
var log4js = require('log4js');
var logger = log4js.getLogger();
var http = require('http');

var fbResponse = '';

router.get('/', function(req, res, next) {
	getMeteo("Angers");
	setTimeout(function() {
		res.render('weather', { place: 'weather', city: 'Angers', data: fbResponse, json: JSON.stringify(fbResponse) } )
	}, 500);
});

router.post("/", function (req, res) {
	getMeteo(req.body.city);
	setTimeout(function() {
		res.render('weather', { place: 'weather', city: req.body.city, data: fbResponse, json: JSON.stringify(fbResponse) } )
	}, 500);
});

module.exports = router;

function getMeteo(city) {
	var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=55348de45dedcf1f3a556544df360bc7';
	
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
}