var mongoose = require('mongoose');
var loggedIn = require('../middleware/loggedIn');
var BlogPost = mongoose.model('BlogPost');

module.exports = function (app) {
    app.get("/post/create", loggedIn, function (req, res) {
        res.render('post/create.jade');
    });

    app.post("/post/create", loggedIn, function (req, res, next) {
        var body = req.param('body');
        var title = req.param('title');
        var user = req.session.user;

        BlogPost.create({
            body: body,
            title: title,
            author: user
        }, function (err, post) {
            if (err) return next(err);
            res.redirect('/post/' + post.id);
        });
    });

    //read
    console.log("Registering /post/:id route");
    app.get("/post/:id", function (req, res, next) {
        var id = req.param('id');
        console.log('Showing post with id %s', id);
        var query = BlogPost.findById(id);

        query.populate('author');

        query.exec(function (err, post) {
            if(err) return next(err);

            if(!post) return next();//404

            res.render('post/view.jade', {post:post});
        });
    });

    //remove
    app.get('/post/remove/:id', loggedIn, function (req, res, next) {
        var id = req.param('id');

        BlogPost.findOne({_id:id}, function(err, post) {
            if(err) next(err);

            if(post.author != req.session.user) {
                return res.status(403);
            }

            post.remove(function(err) {
                if(err) next(err);

                res.redirect('/');
            })
        })
    });

    //update
    app.get('/post/edit/:id', function(req, res, next) {
        var post = BlogPost.findById({_id: req.param('id')});
        res.render('post/crate.jade', {post:post});
    });
};