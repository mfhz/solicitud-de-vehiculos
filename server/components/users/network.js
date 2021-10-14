const express = require("express");
const autenticate = require("../../middlewares/autentication");
const autorization = require("../../middlewares/autorization");

const {
	getAllUsers,
    loginUser,
	createUser,
	getUser,
	updateUserById,
	deleteUserById
} = require("./controller");

//USERS ROUTES
const router = express.Router();

router.post('/access', (req, res) => {
	console.log(req.body);
	const { Password, Email } = req.body;
	loginUser(Password, Email)
		.then((jwt) => {
			res.status(200).json(jwt);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

router.get('/getall', autenticate, autorization, (req, res) => {
	getAllUsers()
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

router.post('/create', autenticate, autorization, (req, res) => {
	const reqUser = req.body;
	createUser(reqUser)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

router.get('/:id', autenticate, autorization, (req, res) => {
	const { id } = req.params;
	getUser(id)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

router.patch('/update/:id', autenticate, autorization, (req, res) => {
	const { id } = req.params;
	const data = req.body;
	// console.log(data);
	updateUserById(id, data)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

router.delete('/delete/:id', autenticate, autorization, (req, res) => {
	const { id } = req.params;
	const data = {
		isDisable: true
	}
	console.log(id, data);
	deleteUserById(id, data)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});



module.exports = router;