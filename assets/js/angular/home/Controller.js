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

			$scope.tagInfo = {};

			$scope.resultList = {};

			$scope.chartConfig = {
				options: {
					rangeSelector : {
		                selected : 1
		            },
					chart: {
						backgroundColor: 'transparent',
						height: $('.col-sm-8').height()
					},
					scrollbar: {
						enabled: false
					},
					xAxis: {
						labels: {
							style: {
								color: "rgba(255,255,255,0.5)"
							}
						}
					},
					yAxis: {
						labels: {
							style: {
								color: "rgba(255,255,255,0.5)"
							}
						}
					},
					plotOptions: {
						line: {
							color: "rgba(255,255,255,1)"
						}
					}
				},

	            title : {
	                text : ''
	            },

	            series : [{
	                data : [],
	                name : '',
	                tooltip: {
	                    valueDecimals: 2
	                }
	            }],

				useHighStocks: true,
			};

			$scope.addTag = function () {
				if ($scope.tagList.indexOf($scope.q) === -1) {
					$('.active').removeClass('active');

					$scope.tagList.push($scope.q);
					$scope.tagInfo[$scope.q] = {};
					$scope.search(true);
				} else {
					// $scope.chartConfig.title.text = $scope.q;
					$scope.chartConfig.series[0].data = $scope.resultList[$scope.q].data;
				}
			};

			$scope.viewTag = function (tag, e) {
				$('.active').removeClass('active');
				$(e.currentTarget).addClass('active');

				$scope.q = tag;
				// $scope.chartConfig.title.text = $scope.q;
				$scope.chartConfig.series[0].data = $scope.resultList[$scope.q].data;
			};

			$scope.deleteTag = function (tag) {
				var index = $scope.tagList.indexOf(tag);
				$scope.tagList.splice(index, 1);
				delete $scope.resultList[tag];
			};

			$scope.searchEnter = function (e) {
				var code = (e.keyCode ? e.keyCode : e.which);
	            if (code === 13) {
	                $scope.addTag();
	            }
			};

			$scope.search = function (refreshOrNew) {
				if (refreshOrNew) {
					$('.refresh i').addClass('fa-spin');

					Twitter.search({
						q: $scope.q
					}, function (err, data) {
						$scope.tagInfo[$scope.q] = {
							sum: data.reduce(function (prev, curr) { prev += curr.sentiment.score; return prev; }, 0),
							latest: data[data.length - 1].sentiment.score
						};

						$scope.resultList[$scope.q] = {
							data: data.map(function (d) {
								return [d.createdAt * 1000, d.sentiment.score];
							})
						};

						// $scope.chartConfig.title.text = $scope.q;
						$scope.chartConfig.series[0].data = data.map(function (d) {
							return [d.createdAt * 1000, d.sentiment.score];
						});

						$('.refresh i').removeClass('fa-spin');
					});
				} else {
					// $scope.chartConfig.title.text = $scope.q;
					$scope.chartConfig.series[0].data = $scope.resultList[$scope.q].data;
				}
			};
		}]);
});
