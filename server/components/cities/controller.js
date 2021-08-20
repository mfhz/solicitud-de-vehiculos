const jwt = require("jsonwebtoken");
const bCrypt = require("bcrypt");
const citiesModel = require("../../database/cities/citiesModel");
const config = require("../../config/index");

const getAllCities = () => {
	return new Promise((res, rejc) => {
		citiesModel
			.findAll()
			.then((city) => {
				res(city);
			})
			.catch((error) => {
				rejc({ status: 500, message: 'intenta de nuevo' });
			});
	});
};

const createCities = (data) => {
	return new Promise((res, rejc) => {
		if (!data.name) {
			rejc({ status: 400, message: 'Se requiere el campo del nombre para crear un origen' });
		} else {
			citiesModel
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

const getCitiesById = (id) => {
	return new Promise((res, rejc) => {
        citiesModel
			.findByPk(id, {})
			.then((city) => {
				if (city) {
					res({ source: city });
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

const updateCitiesById = (id, data) => {
	return new Promise((res, rejc) => {
        citiesModel
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

const deleteCitiesById = (id, data) => {
	return new Promise((res, rejc) => {
		citiesModel
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
    getAllCities,
    createCities,
	getCitiesById,
    updateCitiesById,
    deleteCitiesById
};