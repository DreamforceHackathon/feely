/**
 * HomeController
 *
 * @module      :: Controller
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/10/10
 */

module.exports = (function(){

	function index (req, res) {
		return res.view();
	}

	function twitter_search (req, res) {
		TwitterService.search({
			q: req.query.q
		}, function (err, data) {
			return res.json(data);
		});
	}

	function twitter_callback (req, res) {
		return res.json({});
	}

    return {
        index: index,
		twitter_callback: twitter_callback,

        _config: {}
    };
})();
