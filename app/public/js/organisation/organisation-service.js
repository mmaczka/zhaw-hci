'use strict';

angular.module('hci')
  .factory('Organisation', ['$resource', function ($resource) {
    return $resource('hci/organisations/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);
