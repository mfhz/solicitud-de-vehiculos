const jwt = require("jsonwebtoken");
const bCrypt = require("bcrypt");
const userModel = require("../../database/users/userModel");
const config = require("../../config/index");
const { findByPk } = require("../../database/users/userModel");

const loginUser = (recibed_password, recibed_email) => {
	return new Promise(async (res, rejc) => {
		if (!recibed_email || !recibed_password) {
			rejc({ status: 400, message: 'Por favor ingresa todos los datos' });
		} else {
			let user = await userModel.findOne({
				where: { email: recibed_email },
				raw: true,
			});
			if (user) {
				bCrypt.compare(recibed_password, user.password, (error, result) => {
					if (error) {
						rejc({ status: 500, message: 'intenta de nuevo' });
					}
					if (result) {
						delete user.password;
						res({
							token: jwt.sign(user, config.jwtsecret, {
								expiresIn: '1h',
							}),
						});
					} else {
						rejc({ status: 401, message: `Usuario o Contraseña son incorrectos` });
					}
				});
			} else {
				rejc({ status: 401, message: `Usuario o Contraseña incorrectos` });
			}
		}
	});
};

const getAllUsers = () => {
	return new Promise((res, rejc) => {
		userModel
			.findAll({ attributes: { exclude: ['password'] } })
			.then((users) => {
				res(users);
			})
			.catch((error) => {
				rejc({ status: 500, message: 'intenta de nuevo' });
			});
	});
};

const createUser = (data) => {
	return new Promise((res, rejc) => {
		// console.log(data);
		if (!data.name || !data.last_name || !data.cedula || !data.phone || !data.email || !data.password ) {
			rejc({ status: 400, message: 'Se requiere de todos los campos para crear la cuenta' });
		} else {
			bCrypt.hash(data.password, parseInt(config.rounds_bcr), function (error, encrypted) {
				if (error) {
					rejc({ status: 400, message: 'intenta de nuevo' });
				} else {
					data.password = encrypted;
					userModel
						.create(data)
						.then((user) => {
							delete user.dataValues.password;
							res({ message: 'usuario creado' });
						})
						.catch((error) => {
							// console.log(error);
							if (error.fields.email) {
								rejc({ status: 400, message: 'Usuario con este correo ya existe' });
							} else if (error.fields.cedula) {
								rejc({ status: 400, message: 'Usuario con esta identificación ya existe' });
							} else {
								rejc({ status: 500, message: 'intenta de nuevo' });
							}
						});
				}
			});
		}
	});
};

const getUser = (id) => {
	return new Promise((res, rejc) => {
		userModel
			.findByPk(id, { attributes: { exclude: ['password'] } })
			.then((user) => {
				if (user) {
					res({ user: user });
				} else {
					rejc({ status: 404, message: `usuario no existe` });
				}
			})
			.catch((error) => {
				console.log(error);
				rejc({ status: 500, message: 'intenta de nuevo' });
			});
	});
};

const updateUserById = (id, data) => {
	if (data.password) {
		return new Promise((res, rejc) => {
			bCrypt.hash(data.password, parseInt(config.rounds_bcr), function (error, encrypted) {
				data.password = encrypted;
				userModel
					.update(data, { where: { id: id } })
					.then((response) => {
						if (response[0] === 1) {
							res({ message: 'usuario actualizado' });
						} else {
							rejc({ status: 400, message: 'No se pudo actualizar al usuario.' });
						}
					})
					.catch((error) => {
						rejc({ status: 500, message: 'Intente de nuevo' });
					});
			});
		});
	} else {
		return new Promise((res, rejc) => {
			userModel
				.update(data, { where: { id: id } })
				.then((response) => {
					if (response[0] === 1) {
						res({ message: 'usuario actualizado' });
					} else {
						rejc({ status: 400, message: 'No se pudo actualizar al usuario.' });
					}
				})
				.catch((error) => {
					rejc({ status: 500, message: 'Intente de nuevo' });
				});
		});
	}
};

const deleteUserById = (id, data) => {
	return new Promise((res, rejc) => {
		userModel
			.update(data, { where: { id: id } })
			.then((response) => {
				console.log(response);
				// userModel.findByPk(id, { attributes: { exclude: ['password'] } })
				// .then((success) => {
				// 	console.log(success.isDisable == 1);
				// 	if (success.isDisable == 1) {
				// 		return rejc({ status: 400, message: 'El usuario ya encuentra eliminado' });						
				// 	}
				// })
				if (response == 1) {
					res({ message: 'Usuario eliminado' });
				} else {
					rejc({ status: 400, message: 'usuario no existe o no puede ser eliminado' });
				}
			})
			.catch((error) => {
				rejc({ status: 500, message: 'intenta de nuevo' });
			});
	});
};

module.exports = {
    loginUser,
	getAllUsers,
	createUser,
	getUser,
	updateUserById,
	deleteUserById,
};