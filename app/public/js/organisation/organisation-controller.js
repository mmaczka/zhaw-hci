'use strict';

angular.module('hci')
    .controller('OrganisationController', ['$scope', '$location', '$modal', 'resolvedOrganisations', 'Organisation', 'ComputeProbes', 'ComputeProbe',
        function ($scope, $location, $modal, resolvedOrganisations, Organisation, ComputeProbes, ComputeProbe) {

            $scope.organisations = resolvedOrganisations;

            $scope.computingAll = true;
            $scope.computingOne = true;

            $scope.computeProbes = function () {
                $scope.computingAll = false;
                $scope.computingOne = true;
                var summary = ComputeProbes.get();
                $scope.activeCount = summary.activeCount;
            };
            $scope.computeProbe = function (organisationId, organisationName) {
                $scope.computingAll = true;
                $scope.computingOne = false;
                $scope.organisationName = organisationName;

                ComputeProbe.get({id: organisationId}, function () {
                    $scope.probes = Probe.query({organisationId: $scope.organisation.id});
                });
            };

            $scope.importOrganisations = function () {
                alert("Not yet implemented");
            };


            $scope.create = function () {
                $scope.clear();
                $scope.openEdit();
            };

            $scope.update = function (id) {
                $scope.organisation = Organisation.get({id: id});
                $scope.openEdit(id);
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

            $scope.openEdit = function (id) {
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

            $scope.openEdit = function (id) {
                var organisationSave = $modal.open({
                    templateUrl: 'organisations-import.html',
                    controller: 'OrganisationImportController',
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


            $scope.viewProbes = function (id) {
                $location.path("/probes/" + id);
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
        }]).controller('OrganisationImportController', ['$scope', '$modalInstance',
        function ($scope, $modalInstance) {
            $scope.organisation;


            $scope.ok = function () {
                $modalInstance.close($scope.organisation);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
;
