//var sequlaize =require ('sequleize')

require('array.prototype.find');

var db = require('../../models');
var moment = require('moment');
var sequelize = db.sequelize;

var psiDesktopMetric = require("./metrics/psi/psi-desktop-metric.js");
var psiMobileMetric = require("./metrics/psi/psi-mobile-metric.js");
var htmlValidMetric = require("./metrics/html-validator/html-validator-metric.js");

var metricCalculators = [psiDesktopMetric, psiMobileMetric, htmlValidMetric];

var proxy = null;


var computeMetric = function (metricCalculator, probe, organisation, callback) {
    metricCalculator.calculate(organisation.websiteUrl, proxy, function (score, output) {
        console.log("Metric " + metricCalculator.name + " score: " + score + " " + output);
        db.Metric.findOrCreate({
            where: {probeId: probe.id, type: metricCalculator.name},
            defaults: {score: score, output: output}
        }).spread(function (metric, created) {
            callback(metric);
        })
    });
}

var computeMetrics = function (probe, organisation, callback) {
    var metrics = [];
    metricCalculators.forEach(function (metricCalculator) {
        console.log("Computing metric " + metricCalculator.name + " for " + organisation.name);
        computeMetric(metricCalculator, probe, organisation, function (metric) {
            metrics.push(metric);
        });
    });
    callback(metrics);
};


var findMetric = function (metrics, name, callback) {
    metrics.find(function (metric) {
        return metric.name == name;
    }, callback);
}

var computeTotalScore = function (probe, metrics, callback) {

    console.log("Computing probe total score for probe " + probe.id);
    findMetric(metrics, "psi-desktop", function (psiMetric) {
        var score = psiMetric.score;
        probe.score = score;

        console.log("Total score: " + score);
        probe.save().then(callback(probe));

    });
}

var computeProbe = function (probe, organisation, callback) {
    computeMetrics(probe, organisation, function (metrics) {
            console.log("Probe for " + organisation.name + " (" + organisation.websiteUrl + ") computed");
            computeTotalScore(probe, metrics, function () {
                callback(probe);
            })
        }
    );
};


exports.computeOne = function (organisation) {
    console.log("Computing probe for " + organisation.name + " (" + organisation.websiteUrl + ")");
    var midnight = moment().startOf('day').format();

    // search for attributes
    var probe = db.Probe.findOrCreate({
        where: {
            executionDate: midnight,
            organisationId: organisation.id
        },
        defaults: {
            computationDate: moment().format()
        }
    }).spread(function (probe, created) {
        computeProbe(probe, organisation, function (probe) {
            return probe;
        })
    });
}

exports.computeAll = function (callback) {
    db.Organisation.findAll({where: {active: true}}).then(function (organisations) {
        var count = organisations.length;
        console.log("Found " + count + " active organisation(s). Processing.");
        callback(count);
        organisations.forEach(function (organisation) {
                exports.computeOne(organisation)
            }
        );
    })
};

