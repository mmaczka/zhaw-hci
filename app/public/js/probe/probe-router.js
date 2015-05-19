'use strict';

angular.module('hci')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/probes/:organisation?latest', {
        templateUrl: 'views/probe/probes.html',
        controller: 'ProbeController',
        resolve:{
            resolvedProbes: ['Probe',$route, function (Probe,$routeParms) {

                var parms ={};
                if ($routeParams.organisationId != null){
                    params[organisationId]=$routeParams.organisationId
                }
                return Probe.query(params);
          }]
        }
      })
    }]);
