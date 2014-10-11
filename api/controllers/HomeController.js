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

    return {
        index: index,

        _config: {}
    };
})();
