module.exports = function (sequelize, DataTypes) {
    var Metric = sequelize.define('Metric', {


        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "metric_id"
        },

        type: {
            type: DataTypes.STRING,
            allowNull: false
        },

        probeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "probe_id"
        },
        score: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        output: {
            type: DataTypes.TEXT,
            allowNull: false
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
