//var sequlaize =require ('sequleize')

var db = require('../../models')
var sequelize = db.sequelize;

var psiDesktopMetric = require("./metrics/psi/psi-desktop-metric.js");
var psiMobileMetric = require("./metrics/psi/psi-mobile-metric.js");
var htmlValidMetric = require("./metrics/html-validator/html-validator-metric.js");

var metricCalculator = [psiDesktopMetric, psiMobileMetric, htmlValidMetric];

var proxy = null;
var proceesXXX = function (probe) {

    metricCalculator.forEach(function (metricCalculator) {
        metricCalculator.calculate(organisation.websiteUrl, proxy, function (score, output) {
            console.log(metricCalculator.name + " score: " + score + " " + output);
            metric = db.Metric.create({probeId: probe.id, type: metricCalculator.id, score: score, output: output})
            metric.save();
            //probe.addMetric(metric);
        });
    });
}

var compute = function (organisation) {

    var midnight = new Date().setHours(0, 0, 0, 0);


    // search for attributes
    db.Probe.find({where: {executionDate: midnight}}).then(function (probe) {
        if (probe == null) {
            var probe = db.Probe.build({executionDate: midnight, organisationId: organisation.id});
            probe.save().then(function () {
                processXXX(probe);
            });
        }
        else {
            processXXX(probe)
        }

    })


};

var organisation = db.Organisation.build(
    {
        //id: 1,
        name: "USZ",
        websiteUrl: 'http://www.usz.ch'
    });

organisation.save().then(
    function () {
        compute(organisation);
    });
