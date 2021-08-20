const {DataTypes, NOW, QueryInterface} = require("sequelize");
const sequelize = require("../index");
const userModel = require("../users/userModel");
const statusModel = require("../status/statusModel");
const citiesModel = require("../cities/citiesModel");
const clientModel = require("../clients/clientModel");
const vehicleTypeModel = require("../vehicleType/vehicleTypeModel");


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
				model: citiesModel,
				key: 'id',
			},
			allowNull: false,
		},
		destinyId: {
			type: DataTypes.INTEGER,
			references: {
				model: citiesModel,
				key: 'id',
			},
			allowNull: false,
		},
		clientId: {
			type: DataTypes.INTEGER,
			references: {
				model: clientModel,
				key: 'id',
			},
			allowNull: false,
		},
		vehicleTypeId: {
			type: DataTypes.INTEGER,
			references: {
				model: vehicleTypeModel,
				key: 'id',
			},
			allowNull: false,
		},
		value: {
            type: DataTypes.INTEGER,
            allowNull: false,
			defaultValue: 0,
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
orderModel.belongsTo(citiesModel, {
	foreignKey: 'sourceId',
	targetKey: 'id'
});
orderModel.belongsTo(clientModel, {
	foreignKey: 'clientId',
	targetKey: 'id'
});
orderModel.belongsTo(vehicleTypeModel, {
	foreignKey: 'vehicleTypeId',
	targetKey: 'id'
});

module.exports = orderModel;
