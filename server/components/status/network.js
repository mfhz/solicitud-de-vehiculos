const express = require("express");
const autenticate = require("../../middlewares/autentication");
const autorization = require("../../middlewares/autorization");

const {
    getAllStatus,
    createStatus,
    updateStatusById,
    deleteStatusById
} = require('./controller');

//STATUS ROUTES
const router = express.Router();

router.get('/getall', autenticate, autorization, (req, res) => {
	getAllStatus()
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

router.post('/create', autenticate, autorization, (req, res) => {
	const reqStatus = req.body;
	createStatus(reqStatus)
		.then((status) => {
			res.status(200).json(status);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

router.patch('/update/:id', autenticate, autorization, (req, res) => {
	const { id } = req.params;
	const data = req.body;
	// console.log(data);
	updateStatusById(id, data)
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
	deleteStatusById(id, data)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});


module.exports = router;