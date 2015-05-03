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
                validate: {
                    notNull: true,
                    len: [3, 25]
                }
            },

            website: {
                type: DataTypes.STRING,
                validate: {
                    notNull: true,
                    len: [5, 25],
                    isUrl: true
                }
            },

            facebookProfile: {
                type: DataTypes.STRING,
                validate: {
                    notNull: false,
                    isUrl: true
                },
                field: "facebook_profile"
            }

        },
        {
            classMethods: {
                associate: function(db) {
                    Organisation.hasMany(db.Probe)
                }
            },

            // don't add the timestamp attributes (updatedAt, createdAt)
            timestamps: false,


            // don't use camelcase for automatically added attributes but underscore style
            // so updatedAt will be updated_at
            underscored: true
        });

    return Organisation
}
