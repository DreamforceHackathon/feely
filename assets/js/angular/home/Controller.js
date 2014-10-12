/**
 * ClassController
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/10/11
 */

define(['angular', 'angularHighChart', 'home/services/Twitter'], function (angular) {
	'use strict';

	return angular.module('Home.controllers', ['Home.services', 'highcharts-ng'])

		.controller('HomeController', ['$scope', 'Twitter', function ($scope, Twitter) {
			$scope.chartConfig = {
				options: {
					rangeSelector : {
		                selected : 1
		            }
				},

	            title : {
	                text : ''
	            },

	            series : [{
	                data : [],
	                name : 'AAPL',
	                tooltip: {
	                    valueDecimals: 2
	                }
	            }],

				useHighStocks: true,
			};

			$scope.search = function () {
				Twitter.search({
					q: $scope.q
				}, function (err, data) {
					$scope.results = data;

					$scope.chartConfig.title.text = $scope.q;

					$scope.chartConfig.series[0].data = data.map(function (d) {
							return [d.createdAt * 1000, d.sentiment.score];
					});
				});
			};
		}]);
});
