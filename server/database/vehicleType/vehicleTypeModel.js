const {DataTypes, NOW} = require("sequelize");
const sequelize = require("../index");


const vehicleTypeModel = sequelize.define(
    'vehicleType',
    {
        id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
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




module.exports = vehicleTypeModel;