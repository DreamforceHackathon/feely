/**
 * TwitterService
 *
 * @module      :: Controller
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/10/10
 */

var sentiment = require('sentiment');
var Twit = require('twit');

module.exports = (function(){

    var twit = new Twit({
        consumer_key: process.env.TWITTER_OAUTH_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_OAUTH_CONSUMER_SECRET,
        access_token: process.env.TWITTER_OAUTH_ACCESS_TOKEN,
        access_token_secret: process.env.TWITTER_OAUTH_ACCESS_TOKEN_SECRET
    });

    function search (params, cb) {
        twit.get('search/tweets', { q: params.q + ' since:2011-11-11', count: 100 }, function(err, data, response) {
            cb(null, data);
        });
    }

    return {
        search: search
    };
})();
