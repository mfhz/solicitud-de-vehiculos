const {DataTypes} = require("sequelize");
const sequelize = require("../index");

const statusModel = sequelize.define(
	'status',
	{
		name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
		isDisable: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		}
	},
	{ timestamps: false }
);

module.exports = statusModel;
