const jwt = require("jsonwebtoken");
const bCrypt = require("bcrypt");
const vehicleTypeModel = require("../../database/vehicleType/vehicleTypeModel");
const config = require("../../config/index");

const getAllVehicleType = () => {
	return new Promise((res, rejc) => {
		vehicleTypeModel
			.findAll()
			.then((type) => {
				res(type);
			})
			.catch((error) => {
				rejc({ status: 500, message: 'intenta de nuevo' });
			});
	});
};

const createVehicleType = (data) => {
	return new Promise((res, rejc) => {
		if (!data.name) {
			rejc({ status: 400, message: 'Es necesario de un campo' });
		} else {
			vehicleTypeModel
                .create(data)
                .then((status) => {
                    res({ message: 'Tipo de vehiculo creado correctamente' });
                })
                .catch((error) => {
                    rejc({ status: 500, message: 'intenta de nuevo' });
                });
		}
	});
};

const getVehicleTypeById = (id) => {
	return new Promise((res, rejc) => {
        vehicleTypeModel
			.findByPk(id, {})
			.then((type) => {
				if (type) {
					res({ type: type });
				} else {
					rejc({ status: 404, message: `El tipo de vehiculo ingresado no existe` });
				}
			})
			.catch((error) => {
				console.log(error);
				rejc({ status: 500, message: 'intenta de nuevo' });
			});
    });
};

const updateVehicleTypeById = (id, data) => {
	return new Promise((res, rejc) => {
        vehicleTypeModel
            .update(data, { where: { id: id } })
            .then((response) => {
                if (response[0] === 1) {
                    res({ message: 'Tipo de vehiculo actualizado' });
                } else {
                    rejc({ status: 400, message: 'No se pudo actualizar el Tipo de vehiculo' });
                }
            })
            .catch((error) => {
                rejc({ status: 500, message: 'Intente de nuevo' });
            });
    });
};

const deleteVehicleTypeById = (id, data) => {
	return new Promise((res, rejc) => {
		vehicleTypeModel
			.update(data, { where: { id: id } })
			.then((response) => {
				if (response == 1) {
					res({ message: 'Tipo de vehiculo eliminado' });
				} else {
					rejc({ status: 400, message: 'El Tipo de vehiculo no existe o no puede ser eliminado' });
				}
			})
			.catch((error) => {
				rejc({ status: 500, message: 'intenta de nuevo' });
			});
	});
};


module.exports = {
    getAllVehicleType,
    createVehicleType,
	getVehicleTypeById,
    updateVehicleTypeById,
    deleteVehicleTypeById
};