var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var db = require('./routes/database');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var hbs = require('hbs');
var log4js = require('log4js');
var logger = log4js.getLogger();
log4js.configure({
    appenders: {console: {type: 'console'}},
    categories: {default: {appenders: ['console'], level: 'info'}}
});

var index = require('./routes/index');
var weather = require('./routes/weather');
var meteo = require('./routes/meteo');
var pollution = require('./routes/pollution');

var app = express();
app.use(helmet());

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('ifvalue', function (conditional, options) {
  if (options.hash.value === conditional) {
    return options.fn(this)
  } else {
    return options.inverse(this);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/weather', weather);
app.use('/meteo', meteo);
app.use('/pollution', pollution);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
