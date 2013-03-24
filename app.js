/**
* a simple node server that leverages a would-be module nodeFeeter;
* @depends
* - http
* - nodFeeder.js
*/

var express = require('express');
var app = express();

app.get('/cnnbrk-tweets/', function(req, res){
        var nF = require('./nodeFeeter.js');
        
        var tL = nF.tu.userTimeline({screen_name: 'cnnbrk', count: 10}, function(err, feed) {
                if (feed) {
                    nF.feed = {tweets: feed};
                    
                    var markup = nF.renderTmpl();
                    
                    res.send(markup);
                }
        });
});


app.get('/*/', function(req, res){
        
        var nF = require('./nodeFeeter.js');
        var handle = req.route.params[0];
        
        var tL = nF.tu.userTimeline({screen_name: handle, count: 10}, function(err, feed) {
                if (feed) {
                    nF.feed = {tweets: feed};
                    
                    var markup = nF.renderTmpl();
                    
                    res.send(markup);
                }
        });
});


app.get('/*', function(req, res){
        
        res.send('Requested resource does not live here.');
});

app.listen(30000); 

/**
* @note my server locked up on 3000 at one point and wouldn't give it back
*/

console.log('Server running at http://127.0.0.1:30000/');
