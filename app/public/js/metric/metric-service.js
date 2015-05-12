'use strict';

angular.module('hci')
  .factory('Metric', ['$resource', function ($resource) {
        return $resource('hci/metrics/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);
