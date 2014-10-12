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
			$scope.tagList = [];

			$scope.resultList = {};

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

			$scope.addTag = function () {
				if ($scope.tagList.indexOf($scope.q) === -1) {
					$scope.tagList.push($scope.q);
					$scope.search(true);
				} else {
					$scope.chartConfig.title.text = $scope.q;
					$scope.chartConfig.series[0].data = $scope.resultList[$scope.q].data;
				}
			};

			$scope.viewTag = function (tag) {
				$scope.q = tag;
				$scope.chartConfig.title.text = $scope.q;
				$scope.chartConfig.series[0].data = $scope.resultList[$scope.q].data;
			};

			$scope.search = function (refreshOrNew) {
				if (refreshOrNew) {
					Twitter.search({
						q: $scope.q
					}, function (err, data) {
						$scope.resultList[$scope.q] = {
							data: data.map(function (d) {
								return [d.createdAt * 1000, d.sentiment.score];
							})
						};

						$scope.chartConfig.title.text = $scope.q;
						$scope.chartConfig.series[0].data = data.map(function (d) {
							return [d.createdAt * 1000, d.sentiment.score];
						});
					});
				} else {
					$scope.chartConfig.title.text = $scope.q;
					$scope.chartConfig.series[0].data = $scope.resultList[$scope.q].data;
				}
			};
		}]);
});
