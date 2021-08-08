const jwt = require("jsonwebtoken");
const bCrypt = require("bcrypt");
const sourceModel = require("../../database/source/sourceModel");
const config = require("../../config/index");

const getAllSource = () => {
	return new Promise((res, rejc) => {
		sourceModel
			.findAll()
			.then((source) => {
				res(source);
			})
			.catch((error) => {
				rejc({ status: 500, message: 'intenta de nuevo' });
			});
	});
};

const createSource = (data) => {
	return new Promise((res, rejc) => {
		if (!data.name) {
			rejc({ status: 400, message: 'Se requiere el campo del nombre para crear un origen' });
		} else {
			sourceModel
                .create(data)
                .then((status) => {
                    res({ message: 'Origen creado correctamente' });
                })
                .catch((error) => {
                    rejc({ status: 500, message: 'intenta de nuevo' });
                });
		}
	});
};

const getSourceById = (id) => {
	return new Promise((res, rejc) => {
        sourceModel
			.findByPk(id, {})
			.then((source) => {
				if (source) {
					res({ source: source });
				} else {
					rejc({ status: 404, message: `El origen ingresado no existe` });
				}
			})
			.catch((error) => {
				console.log(error);
				rejc({ status: 500, message: 'intenta de nuevo' });
			});
    });
};

const updateSourceById = (id, data) => {
	return new Promise((res, rejc) => {
        sourceModel
            .update(data, { where: { id: id } })
            .then((response) => {
                if (response[0] === 1) {
                    res({ message: 'Origen actualizado' });
                } else {
                    rejc({ status: 400, message: 'No se pudo actualizar el origen' });
                }
            })
            .catch((error) => {
                rejc({ status: 500, message: 'Intente de nuevo' });
            });
    });
};

const deleteSourceById = (id, data) => {
	return new Promise((res, rejc) => {
		sourceModel
			.update(data, { where: { id: id } })
			.then((response) => {
				if (response == 1) {
					res({ message: 'Origen eliminado' });
				} else {
					rejc({ status: 400, message: 'El origen no existe o no puede ser eliminado' });
				}
			})
			.catch((error) => {
				rejc({ status: 500, message: 'intenta de nuevo' });
			});
	});
};


module.exports = {
    getAllSource,
    createSource,
	getSourceById,
    updateSourceById,
    deleteSourceById
};