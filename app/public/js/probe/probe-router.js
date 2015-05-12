'use strict';

angular.module('hci')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/probes', {
        templateUrl: 'views/probe/probes.html',
        controller: 'ProbeController',
        resolve:{
            resolvedProbes: ['Probe', function (Probe) {
            return Probe.query();
          }]
        }
      })
    }]);
