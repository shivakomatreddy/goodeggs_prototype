var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var mongo = require('mongodb');
var mongo = require('mongoskin');
var db = mongo.db('mongodb://localhost:27017/goodeggs',{native_parser:true});


//Sqlite
var fs = require('fs');
var file = './db/central_db.db';
var exists = fs.existsSync(file);
var sqlite3 = require('sqlite3').verbose();
var sqldb = new sqlite3.Database(file);



var main = require('./routes/index');
var market = require('./routes/market');
var basket = require('./routes/basket');
var inventory = require('./routes/inventory');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next){
    req.db = db;
    next();
});

// Main Routes
app.use('/', main);
app.use('/user',main);
app.use('/admin',main);

// Functional Routes
app.use('/basket',basket);
app.use('/inventory', inventory);
app.use('/market',market);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
