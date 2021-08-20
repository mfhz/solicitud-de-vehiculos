const userModel = require("../database/users/userModel");
const statusModel = require("../database/status/statusModel");
const orderModel = require("../database/orders/orderModel");
const citiesModel = require('../database/cities/citiesModel');
const clientModel = require('../database/clients/clientModel');
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

let cities = [
	{ name: 'Bogotá' },
	{ name: 'Medellín' },
	{ name: 'Cali' }
];

let clients = [
	{	
		name: 'Rotrasvehi',
		nit: 900434012
	},
	{	name: 'Instalcom',
		nit: 900128780
	}
];

let orders = [	
	{
		sourceId: 3,
		destinyId: 1,
		clientId: 1,
		comments: 'Vehiculo para carga larga y pesada 10 Toneladas',
		userId: 1,
		statusId: 1				
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

clients.forEach(async (client) => {
	try {
		await clientModel.create(client);
	} catch (error) {
		console.log(error);
	}
});

cities.forEach(async (city) => {
	try {
		await citiesModel.create(city);
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

