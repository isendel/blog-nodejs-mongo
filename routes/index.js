var mongoose = require('mongoose');
var errors = require('./errors');
var login = require('./login');
var posts = require('./posts');
var BlogPost = mongoose.model('BlogPost');

module.exports = function (app) {
    //home page
    app.get('/', function (req, res, next) {
        BlogPost.find().sort('created').limit(10).exec(function (err, posts) {
            if (err) next(err);
            res.render('home.jade', {posts: posts});
        });
    });

    login(app);

    posts(app);

    errors(app);
};