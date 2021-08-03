const userModel = require("../database/users/userModel");
const statusModel = require("../database/status/statusModel");
const orderModel = require("../database/orders/orderModel");
const bCrypt = require("bcrypt");
const config = require("../config/index");
// const { NOW } = require("sequelize/types");


let users = [
	{ 
		isAdmin: true, 
		isDisable: false,
		name: 'Sebastian', 
		last_name: 'Lopez',
        cedula: 1017241569,
        phone: 11111111,
		email: 'sebastian@gmail.com', 
		password: 'Mh2021-+' 
	},
    { 
		isAdmin: false,
		isDisable: false, 
		name: 'Daniela',
		last_name: 'Fajardo',
        cedula: 1017241568,
        phone: 11111111, 
		email: 'daniela@gmail.com', 
		password: '09876POIU' 
	},
];

let status = [
	{ name: 'Abierto' },
	{ name: 'Cerrado' },
	{ name: 'Pendiente' }
];

let orders = [
	{
		comments: 'Vehiculo patineta para 2 Toneladas',
		userId: 2,
		statuId: 1
	},
	{
		comments: 'Vehiculo para carga larga y pesada 10 Toneladas',
		userId: 1,
		statuId: 1
	},
];

users.forEach(async (user) => {
	await bCrypt.hash(user.password, parseInt(config.rounds_bcr), function (error, encrypted) {
		if (error) {
			console.log(error);
		} else {
			user.password = encrypted;
			userModel
				.create(user)
				.then((user) => {
                    console.log(user);
					console.log('usuarios creado');
				})
				.catch((error) => {
					console.log(error);
				});
		}
	});
});

status.forEach(async (state) => {
	try {
		await statusModel.create(state);
	} catch (error) {
		console.log(error);
	}
});

orders.forEach(async (order) => {
	try {
		await orderModel.create(order);
	} catch (error) {
		console.log(error);
	}
});