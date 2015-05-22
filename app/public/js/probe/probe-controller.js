'use strict';

angular.module('hci')
    .controller('ProbeController', ['$scope', '$modal', 'resolvedProbes', 'Probe', 'resolvedOrganisation', 'ComputeProbe', 'Metric',
        function ($scope, $modal, resolvedProbes, Probe, resolvedOrganisation, ComputeProbe, Metric) {

            $scope.probes = resolvedProbes;
            $scope.organisation = resolvedOrganisation;

            $scope.compute = function () {
                ComputeProbe.get({id: $scope.organisation.id}, function () {
                    $scope.probes = Probe.query({organisationId: $scope.organisation.id});
                    alert("Finished");
                });
            };


            $scope.view = function (id) {
                $scope.probe = Probe.get({id: id});
                $scope.open(id);
            };

            $scope.delete = function (id) {
                Probe.delete({id: id},
                    function () {
                        $scope.probes = Probe.query();
                    });
            };


            $scope.clear = function () {
                $scope.probe = {
                    "organisationId": "",
                    "id": ""
                };
            };

            $scope.open = function (id) {
                $modal.open({
                    templateUrl: 'probe-view.html',
                    controller: 'ProbeViewController',
                    resolve: {
                        probe: function () {
                            return $scope.probe;
                        },
                        metrics: function () {
                            return Metric.query({probeId: id});
                        }
                    }
                });

            };

        }])
    .controller('ProbeViewController', ['$scope', '$modalInstance', 'probe', 'metrics',
        function ($scope, $modalInstance, probe, metrics) {
            $scope.probe = probe;
            $scope.metrics = metrics;


            $scope.close = function () {
                $modalInstance.close($scope.probe);
            };
        }]);
