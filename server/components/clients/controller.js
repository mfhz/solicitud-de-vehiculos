const jwt = require("jsonwebtoken");
const bCrypt = require("bcrypt");
const clientModel = require("../../database/clients/clientModel");
const config = require("../../config/index");

const getAllClients = () => {
	return new Promise((res, rejc) => {
		clientModel
			.findAll()
			.then((client) => {
				res(client);
			})
			.catch((error) => {
				rejc({ status: 500, message: 'intenta de nuevo' });
			});
	});
};

const createClient = (data) => {
	return new Promise((res, rejc) => {
		if (!data.name || !data.nit) {
			rejc({ status: 400, message: 'Se requieren todos los campos para crear un cliente' });
		} else {
			clientModel
                .create(data)
                .then((status) => {
                    res({ message: 'Cliente creado correctamente' });
                })
                .catch((error) => {
                    rejc({ status: 500, message: 'intenta de nuevo' });
                });
		}
	});
};

const getClientById = (id) => {
	return new Promise((res, rejc) => {
        clientModel
			.findByPk(id, {})
			.then((client) => {
				if (client) {
					res({ source: client });
				} else {
					rejc({ status: 404, message: `El cliente ingresado no existe` });
				}
			})
			.catch((error) => {
				console.log(error);
				rejc({ status: 500, message: 'intenta de nuevo' });
			});
    });
};

const updateClientById = (id, data) => {
	return new Promise((res, rejc) => {
        clientModel
            .update(data, { where: { id: id } })
            .then((response) => {
                if (response[0] === 1) {
                    res({ message: 'Cliente actualizado' });
                } else {
                    rejc({ status: 400, message: 'No se pudo actualizar el cliente' });
                }
            })
            .catch((error) => {
                rejc({ status: 500, message: 'Intente de nuevo' });
            });
    });
};

const deleteClientById = (id, data) => {
	return new Promise((res, rejc) => {
		clientModel
			.update(data, { where: { id: id } })
			.then((response) => {
				if (response == 1) {
					res({ message: 'Cliente eliminado' });
				} else {
					rejc({ status: 400, message: 'El cliente no existe o no puede ser eliminado' });
				}
			})
			.catch((error) => {
				rejc({ status: 500, message: 'intenta de nuevo' });
			});
	});
};


module.exports = {
    getAllClients,
    createClient,
	getClientById,
    updateClientById,
    deleteClientById
};