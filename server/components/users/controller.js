const jwt = require("jsonwebtoken");
const bCrypt = require("bcrypt");
const userModel = require("../../database/users/userModel");
const config = require("../../config/index");

const loginUser = (recibed_password, recibed_email) => {
	return new Promise(async (res, rejc) => {
		if (!recibed_email || !recibed_password) {
			rejc({ status: 400, message: 'Favor ingresar todos los datos' });
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


module.exports = {
    loginUser,
	getAllUsers,
};