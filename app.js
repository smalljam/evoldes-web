/*
 *   CONFIGURATION VARIABLES
 */
var PORT = process.env.PORT || 5000;


/*
 *   DEPENDECIES
 */
var express = require('express');
var fs = require('fs');

/*
 *   APP CONFIGURATION
 */
var app = express();
app.configure(function () {
    app.use(express.static(__dirname + '/static'));
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});


/*
 *   ROUTES
 */
app.get('/', function(req, res){
    fs.readFile('index.html', function(e, html) {
        res.set('Content-Type', 'text/html');
        res.send(html);
    });
});

// app.get('/remind', function(req, res){
//     res.set('Content-Type', 'application/json');
//     res.send('{ ok: '+req.url+'}');
// });

/*
 *   RUN
 */
app.listen(PORT);
