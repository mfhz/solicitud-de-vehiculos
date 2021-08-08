const {DataTypes, NOW} = require("sequelize");
const sequelize = require("../index");
const userModel = require("../users/userModel");
const statusModel = require("../status/statusModel");
const sourceModel = require("../source/sourceModel");

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
			allowNull: false,
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
		sourceId: {
			type: DataTypes.INTEGER,
			references: {
				model: sourceModel,
				key: 'id',
			},
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
orderModel.belongsTo(sourceModel, {
	onUpdate: 'cascade'
});

module.exports = orderModel;
