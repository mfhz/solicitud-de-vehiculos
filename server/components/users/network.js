const express = require("express");
const autenticate = require("../../middlewares/autentication");
const autorization = require("../../middlewares/autorization");

const {
	getAllUsers,
    loginUser
} = require("./controller");

//USERS ROUTES
const router = express.Router();

router.post('/access', (req, res) => {
	console.log(req.body);
	const { password, email } = req.body;
	loginUser(password, email)
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



module.exports = router;