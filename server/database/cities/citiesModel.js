const {DataTypes, NOW} = require("sequelize");
const sequelize = require("../index");


const citiesModel = sequelize.define(
    'city',
    {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        isDisable: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    },
    { timestamps: false }
);




module.exports = citiesModel;