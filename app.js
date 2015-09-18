var mongoose = require('mongoose');
var express = require('express');

require("express-mongoose");

var models = require('./models');
var routes = require('./routes');
var middleware = require('./middleware');

mongoose.connect('mongodb://localhost:27017/blog', function(err){
	if(err) throw err;
	console.log('connected');
	var app = express();
    middleware(app);
	routes(app);

	app.listen(3000, function(){
		console.log('now listening on http://localhost:3000');
	});
});
