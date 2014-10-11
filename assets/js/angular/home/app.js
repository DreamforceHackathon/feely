/**
 * Home App
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/10/11
 */

define([
    'angular',
    'angularLoadingBar',
    'home/Controller'
], function (angular) {
    'use strict';

    return angular.module('Home', [
        'chieffancypants.loadingBar',
        'Home.controllers'
    ]);
});
