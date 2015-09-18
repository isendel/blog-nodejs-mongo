var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

module.exports = function(app) {
    app.use(morgan('dev'));

    app.use(cookieParser());
    app.use(session({secret: "building a blog"}));

    app.use(bodyParser());

    app.use(function(req,res,next){
        res.locals.session = req.session;
        next();
    });
};