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
var moment = require('moment');

module.exports = (function(){

    var twit = new Twit({
        consumer_key: process.env.TWITTER_OAUTH_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_OAUTH_CONSUMER_SECRET,
        access_token: process.env.TWITTER_OAUTH_ACCESS_TOKEN,
        access_token_secret: process.env.TWITTER_OAUTH_ACCESS_TOKEN_SECRET
    });

    function search (params, cb) {
        twit.get('search/tweets', { q: params.q + ' since:2014-01-01', count: 10000 }, function(err, data, response) {
            cb(null, data.statuses.map(function (status) {
                var sentimentScore = sentiment(status.text);

                return {
                    tweet: status.text,
                    sentiment: sentimentScore,
                    createdAt: parseInt(moment(new Date(status.created_at)).format('X')),
                    // location: status.place,
                    lang: status.lang
                };
            }).filter(function (status) {
                return status.lang === 'en' && status.sentiment.score !== 0;
            }).sort(function (a, b) {
                return a.createdAt - b.createdAt;
            // }).reduce(function (prev, curr) {
            //     var threeHours = 60 * 60 * 3;
            //     var day = 60 * 60 * 24;
            //
            //     var dayPeriod = curr.createdAt % threeHours;
            //     var dayIndex = _indexOf(prev.day, dayPeriod);
            //     if (dayIndex === -1) {
            //         var data = {
            //             id: dayPeriod,
            //             time: curr.createdAt - dayPeriod,
            //             tweets: [curr.tweet],
            //             score: curr.sentiment.score
            //         };
            //
            //         prev.day.push(data);
            //     } else {
            //         prev.day[dayIndex].tweets.push(curr.tweet);
            //         prev.day[dayIndex].score += curr.sentiment.score;
            //     }
            //
            //     var weekPeriod = curr.createdAt % day;
            //     var weekIndex = _indexOf(prev.week, weekPeriod);
            //     if (weekIndex === -1) {
            //         var data = {
            //             id: weekPeriod,
            //             time: curr.createdAt - weekPeriod,
            //             tweets: [curr.tweet],
            //             score: curr.sentiment.score
            //         };
            //
            //         prev.week.push(data);
            //     } else {
            //         prev.week[weekIndex].tweets.push(curr.tweet);
            //         prev.week[weekIndex].score += curr.sentiment.score;
            //     }
            //
            //     return prev;
            // }, {
            //     day: [],
            //     week: []
            }));
        });
    }

    function searchRaw (params, cb) {
        twit.get('search/tweets', { q: params.q + ' since:2014-10-01', count: 100 }, function(err, data, response) {
            cb(null, data);
        });
    }

    function _indexOf (arr, key) {
        for (var i in arr) {
            if (arr[i].id === key) {
                return i;
            }
        }

        return -1;
    }

    return {
        search: search,
        searchRaw: searchRaw
    };
})();
