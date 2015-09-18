var mongoose = require('mongoose');
var lifecycle = require('mongoose-lifecycle');

var schema = mongoose.Schema({
    title: {type: String, trim: true},
    created: {type: Date, default: Date.now()},
    body: String,
    author: {type: String, ref: 'User'}
});

schema.plugin(lifecycle);

var Post = mongoose.model('BlogPost', schema);

Post.on('afterInsert', function (post) {
    //fake tweet this
    var url = "http://localhost:3000/posts/";
    console.log("Read my new blog post! %s%s", url, post.id);
});