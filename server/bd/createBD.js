const config = require("../config/index");
const mysql = require("mysql2/promise");

//Models
async function syncTables() {
	try {
		const conection = await mysql.createConnection({
			host: config.dbHost,
			user: config.dbUser,
			password: config.dbPass,
		});
		await conection.query(`CREATE DATABASE IF NOT EXISTS \`${config.dbName}\`;`);
		const userModel = require("../database/users/userModel");
		const statuModel = require("../database/status/statusModel");
		const citiesModel = require("../database/cities/citiesModel");
		const clientModel = require("../database/clients/clientModel");
		const orderModel = require("../database/orders/orderModel");
		await userModel.sync();
		await userModel.create(config.root_user);
		await statuModel.sync();
		await clientModel.sync();
		await citiesModel.sync();
		await orderModel.sync();
		
	} catch (error) {
		console.log(error);		
	}
	process.exit(0);
}

syncTables();