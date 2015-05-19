//var sequlaize =require ('sequleize')

var db = require('../../models');
var moment = require('moment');
var sequelize = db.sequelize;

var psiDesktopMetric = require("./metrics/psi/psi-desktop-metric.js");
var psiMobileMetric = require("./metrics/psi/psi-mobile-metric.js");
var htmlValidMetric = require("./metrics/html-validator/html-validator-metric.js");

var metricCalculators = [psiDesktopMetric, psiMobileMetric, htmlValidMetric];

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

    metricCalculators.forEach(function (metricCalculator) {
        console.log("Computing metric " + metricCalculator.name + " for " + organisation.name);
        metricCalculator.calculate(organisation.websiteUrl, proxy, function (score, output) {
            console.log(metricCalculator.name + " score: " + score + " " + output);
            db.Metric.findOrCreate({
                where: {probeId: probe.id, type: metricCalculator.name},
                defaults: {score: score, output: output}
            });
        });
    });
}



var computeProbe = function (organisation) {

    console.log("Computing probe for " + organisation.name + " (" + organisation.websiteUrl + ")");
    var midnight = moment().startOf('day').format();

    // search for attributes
    db.Probe.findOrCreate({
        where: {
            executionDate: midnight,
            organisationId: organisation.id
        },
        defaults: {
            computationDate: moment().format()
        }
    }).spread(function (probe, created) {
        computeMetrics(probe, organisation);
    });


};

var computeAll = function () {
    db.Organisation.findAll({where: {active: true}}).then(function (organisations) {
        console.log("Found " + organisations.length + " active organisation(s). Processing.")
        organisations.forEach(function (organisation) {
                computeProbe(organisation)
            }
        );
    })
};


//createOrganisation();






