'use strict';

angular.module('hci')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/organisations', {
        templateUrl: 'views/organisation/organisations.html',
        controller: 'OrganisationController',
        resolve:{
            resolvedOrganisations: ['Organisation', function (Organisation) {
            return Organisation.query();
          }]
        }
      })
    }]);
