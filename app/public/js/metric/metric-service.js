'use strict';

angular.module('hci')
  .factory('Metric', ['$resource', function ($resource) {
        return $resource('hci/metricCalculator/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);
