'use strict';

angular.module('hci')
    .controller('ProbeController', ['$scope', '$modal', 'resolvedProbes', 'Probe',
        function ($scope, $modal, resolvedProbes, Probe) {

            $scope.probes = resolvedProbes;

            $scope.create = function () {
                $scope.clear();
                $scope.open();
            };

            $scope.update = function (id) {
                $scope.probe = Probe.get({id: id});
                $scope.open(id);
            };

            $scope.delete = function (id) {
                Probe.delete({id: id},
                    function () {
                        $scope.probes = Probe.query();
                    });
            };

            $scope.save = function (id) {
                if (id) {
                    Probe.update({id: id}, $scope.probe,
                        function () {
                            $scope.probes = Probe.query();
                            $scope.clear();
                        });
                } else {
                    Probe.save($scope.probe,
                        function () {
                            $scope.probes = Probe.query();
                            $scope.clear();
                        });
                }
            };

            $scope.clear = function () {
                $scope.probe = {

                    "organisationId": "",

                    "id": ""
                };
            };

            $scope.open = function (id) {
                var probeSave = $modal.open({
                    templateUrl: 'probe-save.html',
                    controller: 'ProbeSaveController',
                    resolve: {
                        probe: function () {
                            return $scope.probe;
                        }
                    }
                });

                probeSave.result.then(function (entity) {
                    $scope.probe = entity;
                    $scope.save(id);
                });
            };
        }])
    .controller('ProbeSaveController', ['$scope', '$modalInstance', 'probe',
        function ($scope, $modalInstance, probe) {
            $scope.probe = probe;


            $scope.ok = function () {
                $modalInstance.close($scope.probe);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
