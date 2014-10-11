/**
 * FeelyAPI
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/10/11
 */

define([
    'home/services',
], function (homeServices) {
    'use strict';

    return homeServices

        .factory('FeelyAPI', ['$http', function ($http) {
            // var FEELY_API_URL = 'http://localhost:1337';
            var FEELY_API_URL = 'https://getfeely.herokuapp.com';

            function FeelyAPI (params) {
                if (params) {
                    params.url = FEELY_API_URL + params.url;
                    return $http(params);
                }
            }

            FeelyAPI.get = function (url, config) {
                return $http.get(FEELY_API_URL + url, config);
            };

            return FeelyAPI;
        }]);
});
