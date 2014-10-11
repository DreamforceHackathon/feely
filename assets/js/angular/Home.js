/**
 * Home
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/10/11
 */

require.config({
    baseUrl: 'js/angular',
    paths: {
        jquery: '../vendor/jquery/dist/jquery.min',
        highStock: '../vendor/highstock-release/highstock',
        angular: '../vendor/angular/angular.min',
        angularLoadingBar: '../vendor/angular-loading-bar/build/loading-bar',
        angularHighChart: '../vendor/highchart-ng/dist/highcharts-ng.min'
    },
    shim: {
        jquery: { exports: '$' },
        angular: { exports: 'angular', deps: ['jquery'] },
        angularLoadingBar: ['angular'],
        angularHighChart: ['angular', 'highStock']
    }
});

require([
    'angular',
    'home/app'
], function (angular, homeApp) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, [homeApp.name]);
    });
});
