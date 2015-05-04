'use strict';

angular.module('hci')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/metrics', {
        templateUrl: 'views/metric/metrics.html',
        controller: 'MetricController',
        resolve:{
          resolvedMetric: ['Metric', function (Metric) {
            return Metric.query();
          }]
        }
      })
    }]);
