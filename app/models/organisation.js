module.exports = function (sequelize, DataTypes) {
    var Organisation = sequelize.define('Organisation', {


            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true, // Automatically gets converted to SERIAL for postgres
                field: "organisation_id"
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [3, 25]
                }
            },

            websiteUrl: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [5, 25],
                    isUrl: true
                },
                field: "website_url"
            },

            facebookProfile: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    isUrl: true
                },
                field: "facebook_profile"
            },
            active: {
                type: DataTypes.BOOLEAN
            }

        },
        {

            associate: function (db) {
                Organisation.hasMany(db.Probe, {onDelete: 'cascade', foreignKey: 'organisation_id'})
            },


            // don't add the timestamp attributes (updatedAt, createdAt)
            timestamps: false,


            // don't use camelcase for automatically added attributes but underscore style
            // so updatedAt will be updated_at
            underscored: true
        });

    return Organisation
}
