const {DataTypes, NOW} = require("sequelize");
const sequelize = require("../index");


const sourceModel = sequelize.define(
    'source',
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




module.exports = sourceModel;