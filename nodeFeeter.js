/**
* @depends 
* - tuiter @depends superagent, superagent-oauth, oauth, njstream, debug
* - util
* - fs
*/

var keys = {
    "consumer_key" : "80SelDBUgKTlPVHPHk0eNg",
    "consumer_secret" : "Fo5gwNKBZYlGA0Gh2xEcwhNjM3pbJpepYdN5i40",
    "access_token_key" : "410003382-Pm19h7d5nyuYqTCfqR86tqP4GYmYenErH9bfaIjp",
    "access_token_secret" : "TpFf4JcBkTl8MHmpdzWj64FRNSyy4JC9ylf0GINSWWg"
};

var dust = require('dustjs-linkedin');
var hlprs = require('dustjs-helpers');
var u = require('util');

module.exports = {
    feed: null,
    tu: require('tuiter')(keys),
    header: '',
    template: '', //dust.compile('<h2>%s</h2>', 'feeter'),
    regex: /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/i,
    swap: function(str) {
        if (! str) return;
        var parsed = this.regex.exec(str);
        if (! parsed) return str;
        return str.replace(parsed[0], parsed[0].link(parsed[0]));
    },
    renderTmpl: function() {
        for(var idx in this.feed.tweets) {
            tweet = this.feed.tweets[idx];
            tweet.text = this.swap(tweet.text);
        }
        var tmpl = dust.compile(this.template, 'feeter');
        // wow - alot of issues working w/dust :|
        dust.loadSource(tmpl);
        var markup = '';
        dust.render('feeter', this.feed, function(err, out) {
                if (err) throw err;
               
                markup = out;
        });
        
        return this.header + markup;
    },
    dummy: null
};

var fs = require('fs');
fs.readFile('./header.html.tmpl', 'utf8', function (err, data) {
        if (err) throw err;
        module.exports.header = data;
});

fs.readFile('./page.html.tmpl', 'utf8', function (err, data) {
        if (err) throw err;
        module.exports.template = data;
});
