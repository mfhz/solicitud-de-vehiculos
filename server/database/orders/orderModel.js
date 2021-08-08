const {DataTypes, NOW} = require("sequelize");
const sequelize = require("../index");
const userModel = require("../users/userModel");
const statusModel = require("../status/statusModel");

const orderModel = sequelize.define(
	'orders',
	{
		date: {
            type: DataTypes.DATE,
            defaultValue: NOW(),
        },
		comments: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
		userId: {
			type: DataTypes.INTEGER,
			references: {
				model: userModel,
				key: 'id',
			},
		},
		statusId: {
			type: DataTypes.INTEGER,
			references: {
				model: statusModel,
				key: 'id',
			},
			defaultValue: 1,
			allowNull: false,
		},
		isDisable: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		}
	},
	{ timestamps: false }
);
orderModel.belongsTo(userModel, {
	onUpdate: 'cascade'
});
orderModel.belongsTo(statusModel, {
	onUpdate: 'cascade'
});

module.exports = orderModel;
