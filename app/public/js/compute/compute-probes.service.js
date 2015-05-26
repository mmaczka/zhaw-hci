'use strict';

angular.module('hci')
    .factory('ComputeProbes', ['$resource', function ($resource) {
        return $resource('hci/computeAll', {}, {
            'get': {method: 'GET', isArray: false}
        });
    }]);
