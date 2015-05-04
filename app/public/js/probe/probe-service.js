'use strict';

angular.module('hci')
  .factory('Probe', ['$resource', function ($resource) {
    return $resource('hci/probes/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);
