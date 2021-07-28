const {DataTypes} = require("sequelize");
const sequelize = require("../index");

const userModel = sequelize.define(
	'users',
	{
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		last_name: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
        cedula: {
			type: DataTypes.INTEGER,
			allowNull: false,
            unique: true,
		},
        phone: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
	},
	{ timestamps: false }
);

module.exports = userModel;
