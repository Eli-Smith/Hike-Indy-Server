module.exports = (sequelize, DataTypes) => {
    return sequelize.define('trail', {
        trailName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        distance: {
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.STRING,
        },
        difficulty: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}