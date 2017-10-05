var express = require('express');
var router = express.Router();
var log4js = require('log4js');
var logger = log4js.getLogger();
var http = require('http');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/imie_vol', function (err) {
    if (err) {
        throw err;
    }
});
var Schema = mongoose.Schema;
var volSchema = new Schema({
    name: String,
    author: String,
    date: {type: Date, default: Date.now}
});

var volModel = mongoose.model('Vol', volSchema);
var datas = [];

router.get('/', function (req, res, next) {
    var query = volModel.find(null)
    query.exec(function (err, vols) {
        if (err) {
            throw err;
        }
        // On va parcourir le résultat et les afficher joliment
        var vol;
        for (var i = 0, l = vols.length; i < l; i++) {
            vol = vols[i];
            logger.info('------------------------------');
            logger.info('Nom : ', vol.name);
            logger.info('Auteur : ', vol.author);
            logger.info('Date : ', vol.date);
            logger.info('ID : ', vol._id);
            logger.info('------------------------------');
            datas[i] = ({'nom': vol.name, 'auteur': vol.author, 'date': vol.date})
            logger.info("Got a response: ", datas);
        }
        res.render('vol', { place :'vol', data: datas, json: JSON.stringify(datas) });
    });
});

router.post('/', function (req, res, next) {

    var newVol = new volModel({name: req.body.name, author: req.body.author});
    var dateN = Date.now;
    newVol.save(function (err) {
        if (err) {
            throw err;
        } else {
            if (req.body.date) {
                dateN = req.body.date
            }
            datas.push({"nom": req.body.name, "auteur" : req.body.author, "date" : dateN});
        }

        console.log('Vol ajouté avec succès !');
        res.render('vol',{ place: 'vol', data: datas, json: JSON.stringify(datas) });
    });
});


module.exports = router;
