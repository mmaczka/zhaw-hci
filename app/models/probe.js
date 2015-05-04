module.exports = function (sequelize, DataTypes) {
    var Probe = sequelize.define('Probe', {

            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true, // Automatically gets converted to SERIAL for postgres
                field: "probe_id"
            },
            executionDate: {
                type: DataTypes.DATE,
                allowNull: false,
                field: "execution_date"
            },
            organisationId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "organisation_id"
            }
        },
        {

            classMethods: {
                associate: function (db) {
                    Probe.hasMany(db.Metric)
                }
            },
            // don't add the timestamp attributes (updatedAt, createdAt)
            timestamps: false,


            // don't use camelcase for automatically added attributes but underscore style
            // so updatedAt will be updated_at
            underscored: true
        }
    );

    return Probe
}
