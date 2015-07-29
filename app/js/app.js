'use strict';

/* App Module */

var varhpaApp = angular.module('hpaApp', [
  'ngRoute',
  'ngMaterial',
  'hpaControllers',
  'commonServices',
  'highcharts-ng'
]);


varhpaApp.config(['$routeProvider',
  function($routeProvider) {
    //console.log('in router');
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      }).
      when('/analyze', {
        templateUrl: 'partials/analyze.html',
        controller: 'AnalyzeCtrl'
      }).
      when('/guidance', {
        templateUrl: 'partials/guidance.html',
        controller: 'GuidanceCtrl'
      }).
      when('/extrsc', {
        templateUrl: 'partials/extrsc.html',
        controller: 'ExtRscCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);
