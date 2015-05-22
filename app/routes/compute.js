var db = require('../models');
var probeComputer = require('../services/probeComputer');

exports.computeProbe = function (req, res) {
    var organisationId = req.param('organisationId');
    console.log("Looking for organisation: " + organisationId);
    db.Organisation.find({where: {id: req.param('id')}}).then(function (organisation) {
        console.log("Found organisation for id  " + organisationId + ": '" + organisation.name + "'. Executing probe");
        probeComputer.computeOne(organisation, function (probe) {
                res.json(probe);
                console.log("Finishing computeProbe rest call");
            }
        );
    })
};
