module.exports = function (app) {

    //404s
    app.use(function (req, res, next) {
        res.status(404);

        if (req.accepts('html')) {
            return res.send("<h2>I'm sorry, I couldn't find that page.</h2>");
        }

        if (req.accepts('json')) {
            return res.json({error: 'Not found'});
        }

        res.type('txt');
        res.send("Hmmm, couldn't find that page.");
    });

    app.use(function(err, req, res, next){
        console.error('error at %s\n', req.url, err);
        res.status(500).send("Oops, we made a boo boo.");
    });
}