'use strict';

angular.module('hci')
    .controller('MetricController', ['$scope', '$modal', 'resolvedMetrics', 'Metric',
        function ($scope, $modal, resolvedMetrics, Metric) {

            $scope.metrics = resolvedMetrics;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.metric = Metric.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        Metric.delete({id: id},
          function () {
            $scope.metrics = Metric.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          Metric.update({id: id}, $scope.metric,
            function () {
              $scope.metrics = Metric.query();
              $scope.clear();
            });
        } else {
          Metric.save($scope.metric,
            function () {
              $scope.metrics = Metric.query();
              $scope.clear();
            });
        }
      };

      $scope.clear = function () {
        $scope.metric = {

            "type": "",

            "probeId": "",

            "value": "",

            "y": "",

            "id": ""
        };
      };

      $scope.open = function (id) {
        var metricSave = $modal.open({
          templateUrl: 'metric-save.html',
          controller: 'MetricSaveController',
          resolve: {
            metric: function () {
              return $scope.metric;
            }
          }
        });

        metricSave.result.then(function (entity) {
          $scope.metric = entity;
          $scope.save(id);
        });
      };
    }])
  .controller('MetricSaveController', ['$scope', '$modalInstance', 'metric',
    function ($scope, $modalInstance, metric) {
      $scope.metric = metric;


        $scope.ok = function () {
        $modalInstance.close($scope.metric);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);
