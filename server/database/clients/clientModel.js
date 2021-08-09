const {DataTypes, NOW} = require("sequelize");
const sequelize = require("../index");


const clientModel = sequelize.define(
    'clients',
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
        nit: {
            type: DataTypes.INTEGER,
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




module.exports = clientModel;