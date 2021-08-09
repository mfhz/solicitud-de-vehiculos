const jwt = require("jsonwebtoken");
const bCrypt = require("bcrypt");
const destinyModel = require("../../database/destiny/destinyModel");
const config = require("../../config/index");

const getAllDestiny = () => {
	return new Promise((res, rejc) => {
		destinyModel
			.findAll()
			.then((source) => {
				res(source);
			})
			.catch((error) => {
				rejc({ status: 500, message: 'intenta de nuevo' });
			});
	});
};

const createDestiny = (data) => {
	return new Promise((res, rejc) => {
		if (!data.name || !data.sourceId) {
			rejc({ status: 400, message: 'Se requieren todos los campos para crear el destino' });
		} else {
			destinyModel
                .create(data)
                .then((status) => {
                    res({ message: 'Destino creado correctamente' });
                })
                .catch((error) => {
                    rejc({ status: 500, message: 'intenta de nuevo' });
                });
		}
	});
};

const getDestinyById = (id) => {
	return new Promise((res, rejc) => {
        destinyModel
			.findByPk(id, {})
			.then((source) => {
				if (source) {
					res({ source: source });
				} else {
					rejc({ status: 404, message: `El destino ingresado no existe` });
				}
			})
			.catch((error) => {
				console.log(error);
				rejc({ status: 500, message: 'intenta de nuevo' });
			});
    });
};

const updateDestinyById = (id, data) => {
	return new Promise((res, rejc) => {
        destinyModel
            .update(data, { where: { id: id } })
            .then((response) => {
                if (response[0] === 1) {
                    res({ message: 'Destino actualizado' });
                } else {
                    rejc({ status: 400, message: 'No se pudo actualizar el destino' });
                }
            })
            .catch((error) => {
                rejc({ status: 500, message: 'Intente de nuevo' });
            });
    });
};

const deleteDestinyById = (id, data) => {
	return new Promise((res, rejc) => {
		destinyModel
			.update(data, { where: { id: id } })
			.then((response) => {
				if (response == 1) {
					res({ message: 'Destino eliminado' });
				} else {
					rejc({ status: 400, message: 'El destino no existe o no puede ser eliminado' });
				}
			})
			.catch((error) => {
				rejc({ status: 500, message: 'intenta de nuevo' });
			});
	});
};


module.exports = {
    getAllDestiny,
    createDestiny,
	getDestinyById,
    updateDestinyById,
    deleteDestinyById
};