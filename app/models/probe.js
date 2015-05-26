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
            computationDate: {
                type: DataTypes.DATE,
                allowNull: false,
                field: "computation_date"
            },
            organisationId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "organisation_id"
            }
            ,
            score: {
                type: DataTypes.FLOAT,
                allowNull: true,
                field: "organisation_id"
            }
        },
        {

            associate: function (db) {
                Probe.hasMany(db.Metric, {onDelete: 'cascade', foreignKey: 'probe_id'});
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
