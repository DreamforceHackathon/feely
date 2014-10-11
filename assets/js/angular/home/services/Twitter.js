/**
 * Twitter
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/10/11
 */

define([
    'home/services',
    'home/services/FeelyAPI'
], function (homeServices) {
    'use strict';

    return homeServices

        .factory('Twitter', ['FeelyAPI', function (FeelyAPI) {
            return {
                search: function (params, cb) {
                    FeelyAPI({
                        url: '/twitter/search',
                        method: 'GET',
                        params: params
                    }).success(function(response) {
                        if (response.status === 'OK') {
                            cb(null, response.data)
                        } else {
                            cb(response.error);
                        }
                    });
                }
            };
        }]);
});
