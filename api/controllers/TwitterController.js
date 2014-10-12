/**
 * TwitterController
 *
 * @module      :: Controller
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/10/10
 */

module.exports = (function(){

    function search (req, res) {
        TwitterService.search({
            q: req.query.q
        }, function (err, data) {
            return res.json({
                status: 'OK',
                data: data
            });
        });
    }

    function search_raw (req, res) {
        TwitterService.searchRaw({
            q: req.query.q
        }, function (err, data) {
            return res.json({
                status: 'OK',
                data: data
            });
        });
    }

    function oauth_callback (req, res) {

    }

    return {
        search: search,
        search_raw: search_raw,
        oauth_callback: oauth_callback,

        _config: {}
    };
})();
