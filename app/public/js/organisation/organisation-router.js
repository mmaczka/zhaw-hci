'use strict';

angular.module('hci')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/organisations', {
        templateUrl: 'views/organisation/organisations.html',
        controller: 'OrganisationController',
        resolve:{
          resolvedOrganisation: ['Organisation', function (Organisation) {
            return Organisation.query();
          }]
        }
      })
    }]);
