'use strict';

angular.module('hci')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/probes/:organisationId', {
                templateUrl: 'views/probe/probes.html',
                controller: 'ProbeController',
                resolve: {
                    resolvedProbes: ['Probe', '$route', function (Probe, $route) {


                        var organisationId = $route.current.params.organisationId;
                        var params = {};
                        console.log("Looking for probes of " + organisationId);
                        params['organisationId'] = organisationId;

                        return Probe.query(params);
                    }],
                    resolvedOrganisation: ['Organisation', '$route', function (Organisation, $route) {

                        var organisationId = $route.current.params.organisationId;
                        //   var params ={};
                        //   if ($routeParams.organisationId != null){
                        //       params[organisationId]=$routeParams.organisationId
                        //   }
                        return Organisation.get({id: organisationId});
                    }]
                }
            })
    }]);
