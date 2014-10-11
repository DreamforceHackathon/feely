/**
 * ClassController
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/10/11
 */

define(['angular', 'home/services/Twitter'], function (angular, toastr) {
	'use strict';

	return angular.module('Home.controllers', ['Home.services'])

		.controller('HomeController', ['$scope', '$location', 'Twitter', function ($scope, $location, Twitter) {
			$scope.name = "Twitter"
		}]);
});
