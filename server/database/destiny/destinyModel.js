const {DataTypes, NOW} = require("sequelize");
const sequelize = require("../index");
const sourceModel = require("../source/sourceModel");

const destinyModel = sequelize.define(
    'destiny',
    {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false
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
            allowNull: false
        }
    },
    { timestamps: false }
);
destinyModel.belongsTo(sourceModel, { 
	foreignKey: 'sourceId',
	targetKey: 'id' 
});




module.exports = destinyModel;