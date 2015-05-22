'use strict';

angular.module('hci')
    .factory('ComputeProbe', ['$resource', function ($resource) {
        return $resource('hci/compute/:id', {}, {
            'get': {method: 'GET', isArray: false}
        });
    }]);
