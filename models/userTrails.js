module.exports = function(sequelize, DataTypes){
    return sequelize.define('userTrails', {
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        trailName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        difficulty: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}