module.exports = function (sequelize, DataTypes) {
    var Metric = sequelize.define('Metric', {


        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "metric_id"
        },

        type: {
            type: DataTypes.INTEGER,
            validate: {
                notNull: true
            }

        },

        probeId: {
            type: DataTypes.INTEGER,
            validate: {
                notNull: true
            },
            field: "probe_id"
        },

        value: {
            type: DataTypes.INTEGER,
            validate: {
                notNull: true
            }
        }

    }, {

        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,


        // don't use camelcase for automatically added attributes but underscore style
        // so updatedAt will be updated_at
        underscored: true
    });


    return Metric
}
