module.exports = function (sequelize, DataTypes) {
    return sequelize.define('visitList', {
        trailName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}