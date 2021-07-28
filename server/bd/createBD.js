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
		await userModel.sync();
		await userModel.create(config.root_user);
	} catch (error) {
		console.log(error);		
	}
	process.exit(0);
}

syncTables();