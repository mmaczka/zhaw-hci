//var sequlaize =require ('sequleize')

var db = require('../../models');
var moment = require('moment');
var sequelize = db.sequelize;

var psiDesktopMetric = require("./metrics/psi/psi-desktop-metric.js");
var psiMobileMetric = require("./metrics/psi/psi-mobile-metric.js");
var htmlValidMetric = require("./metrics/html-validator/html-validator-metric.js");

var metricCalculator = [psiDesktopMetric, psiMobileMetric, htmlValidMetric];

var proxy = null;


var createOrganisation = function () {

    var organisation = db.Organisation.build(
        {
            name: "USZ",
            websiteUrl: 'http://www.usz.ch',
            active: true
        });

    return organisation.save();
};


var computeMetrics = function (probe, organisation) {

    metricCalculator.forEach(function (metricCalculator) {
        metricCalculator.calculate(organisation.websiteUrl, proxy, function (score, output) {
            console.log(metricCalculator.name + " score: " + score + " " + output);
            var metric = db.Metric.build({probeId: probe.id, type: metricCalculator.name, score: score, output: output})
            metric.save();
        });
    });
}

var computeProbe = function (organisation) {

    console.log("Computing probe for " + organisation.name + " (" + organisation.websiteUrl + ")");
    var midnight = moment().startOf('day').format();

    console.log(midnight);
    // search for attributes
    db.Probe.find({where: {executionDate: midnight, organisationId: organisation.id}}).then(function (probe) {
        if (probe != null) {
            probe.destroy();
        }
    })
    var probe = db.Probe.build({
        executionDate: midnight,
        computationDate: moment().format(),
        organisationId: organisation.id
    });
    probe.save().then(function () {
        computeMetrics(probe, organisation);
    });

};

var compute = function () {
    db.Organisation.findAll({where: {active: true}}).then(function (organisations) {
        console.log("Found " + organisations.length + " active organisation(s). Processing.")
        organisations.forEach(function (organisation) {
                computeProbe(organisation)
            }
        );
    })
};


//createOrganisation();


compute();


//
//var organisation = db.Organisation.find({where: {name: "USZ"}}).then(function (organisation) {
//        if (organisation == null) {
//            createOrganisation().then(function (organisation) {
//                compute(organisation);
//            })
//        }
//        else {
//            compute(organisation);
//        }
//    }
//);


