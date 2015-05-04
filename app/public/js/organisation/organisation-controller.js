'use strict';

angular.module('hci')
  .controller('OrganisationController', ['$scope', '$modal', 'resolvedOrganisation', 'Organisation',
    function ($scope, $modal, resolvedOrganisation, Organisation) {

      $scope.organisations = resolvedOrganisation;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.organisation = Organisation.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        Organisation.delete({id: id},
          function () {
            $scope.organisations = Organisation.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          Organisation.update({id: id}, $scope.organisation,
            function () {
              $scope.organisations = Organisation.query();
              $scope.clear();
            });
        } else {
          Organisation.save($scope.organisation,
            function () {
              $scope.organisations = Organisation.query();
              $scope.clear();
            });
        }
      };

      $scope.clear = function () {
        $scope.organisation = {
          
          "name": "",
          
          "website": "",
          
          "facebookProfile": "",
          
          "id": ""
        };
      };

      $scope.open = function (id) {
        var organisationSave = $modal.open({
          templateUrl: 'organisation-save.html',
          controller: 'OrganisationSaveController',
          resolve: {
            organisation: function () {
              return $scope.organisation;
            }
          }
        });

        organisationSave.result.then(function (entity) {
          $scope.organisation = entity;
          $scope.save(id);
        });
      };
    }])
  .controller('OrganisationSaveController', ['$scope', '$modalInstance', 'organisation',
    function ($scope, $modalInstance, organisation) {
      $scope.organisation = organisation;

      

      $scope.ok = function () {
        $modalInstance.close($scope.organisation);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);
