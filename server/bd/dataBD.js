const userModel = require("../database/users/userModel");
const bCrypt = require("bcrypt");
const config = require("../config/index");

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