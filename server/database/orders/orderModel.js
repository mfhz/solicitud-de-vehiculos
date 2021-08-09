const {DataTypes, NOW, QueryInterface} = require("sequelize");
const sequelize = require("../index");
const userModel = require("../users/userModel");
const statusModel = require("../status/statusModel");
const sourceModel = require("../source/sourceModel");
const destinyModel = require("../destiny/destinyModel");


const orderModel = sequelize.define(
	'orders',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
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
		destinyId: {
			type: DataTypes.INTEGER,
			references: {
				model: destinyModel,
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
	foreignKey: 'userId',
	targetKey: 'id'
});
orderModel.belongsTo(statusModel, {
	foreignKey: 'statusId',
	targetKey: 'id'
});
orderModel.belongsTo(sourceModel, {
	foreignKey: 'sourceId',
	targetKey: 'id'
});
orderModel.belongsTo(destinyModel, {
	foreignKey: 'destinyId',
	targetKey: 'id'
});

module.exports = orderModel;
