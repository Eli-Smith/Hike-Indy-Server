module.exports = (sequelize, DataTypes) => {
    return sequelize.define('trail', {
        trailName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        park: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        difficulty: {
            type: DataTypes.STRING
        },
        length: {
            type: DataTypes.STRING
        },
    })
}