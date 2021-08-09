const express = require("express");
const autenticate = require("../../middlewares/autentication");
const autorization = require("../../middlewares/autorization");

const {
    getAllClients,
    createClient,
	getClientById,
    updateClientById,
    deleteClientById
} = require('./controller');

//CLIENTS ROUTES
const router = express.Router();

router.get('/getall', autenticate, autorization, (req, res) => {
	getAllClients()
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

router.post('/create', autenticate, autorization, (req, res) => {
	const reqSource = req.body;
	createClient(reqSource)
		.then((source) => {
			res.status(200).json(source);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

router.get('/:id', autenticate, autorization, (req, res) => {
	const { id } = req.params;
	getClientById(id)
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
	updateClientById(id, data)
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
	deleteClientById(id, data)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});


module.exports = router;