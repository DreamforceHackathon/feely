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
            return res.json(data);
        });
    }

    function oauth_callback (req, res) {

    }

    return {
        search: search,
        oauth_callback: oauth_callback,

        _config: {}
    };
})();
