var createOrganisation = function () {
    var organisation = db.Organisation.build(
        {
            name: "USZ",
            websiteUrl: 'http://www.usz.ch',
            active: true
        });

    return organisation.save();
};
