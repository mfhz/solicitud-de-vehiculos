const jwt = require("jsonwebtoken");
const bCrypt = require("bcrypt");
const statusModel = require("../../database/status/statusModel");
const config = require("../../config/index");

const getAllStatus = () => {
	return new Promise((res, rejc) => {
		statusModel
			.findAll()
			.then((status) => {
				res(status);
			})
			.catch((error) => {
				rejc({ status: 500, message: 'intenta de nuevo' });
			});
	});
};

const createStatus = (data) => {
	return new Promise((res, rejc) => {
		if (!data.name) {
			rejc({ status: 400, message: 'Se requiere el campo del nombre para crear el estado' });
		} else {
			statusModel
                .create(data)
                .then((status) => {
                    res({ message: 'Estado creado correctamente' });
                })
                .catch((error) => {
                    rejc({ status: 500, message: 'intenta de nuevo' });
                });
		}
	});
};

const updateStatusById = (id, data) => {
	return new Promise((res, rejc) => {
        statusModel
            .update(data, { where: { id: id } })
            .then((response) => {
                if (response[0] === 1) {
                    res({ message: 'Estado actualizado' });
                } else {
                    rejc({ status: 400, message: 'No se pudo actualizar al estado.' });
                }
            })
            .catch((error) => {
                rejc({ status: 500, message: 'Intente de nuevo' });
            });
    });
};

const deleteStatusById = (id, data) => {
	return new Promise((res, rejc) => {
		statusModel
			.update(data, { where: { id: id } })
			.then((response) => {
				if (response == 1) {
					res({ message: 'Estado eliminado' });
				} else {
					rejc({ status: 400, message: 'El estado no existe o no puede ser eliminado' });
				}
			})
			.catch((error) => {
				rejc({ status: 500, message: 'intenta de nuevo' });
			});
	});
};


module.exports = {
    getAllStatus,
    createStatus,
    updateStatusById,
    deleteStatusById
};