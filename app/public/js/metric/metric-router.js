'use strict';

angular.module('hci')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/metricCalculator', {
            templateUrl: 'views/metric/metricCalculator.html',
        controller: 'MetricController',
        resolve:{
          resolvedMetric: ['Metric', function (Metric) {
            return Metric.query();
          }]
        }
      })
    }]);
