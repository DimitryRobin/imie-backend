var express = require('express');
var router = express.Router();
var log4js = require('log4js');
var logger = log4js.getLogger();
var http = require('http');
var parseString = require('xml2js').parseString;

var url = 'http://vigilance.meteofrance.com/data/NXFR49_LFPW_.xml?9326286';
var fbResponse ='';
var jsonText = '';

router.get('/', function(req, res, next) {
    http.get(url, function(res) {
        var body = '';

        res.on('data', function(data) {
            body += data;
        });

        res.on('end', function() {
            parseString(body, function (err, result) {
                fbResponse = result;
            });
            jsonText = JSON.stringify(fbResponse);
            logger.info("Got a response: ", jsonText);
        });
    }).on('error', function(e) {
        logger.error("Got an error: ", e);
    });
    res.render('meteo', { data: fbResponse, json: jsonText } );
});


module.exports = router;
