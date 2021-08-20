const express = require("express");
const autenticate = require("../../middlewares/autentication");
const autorization = require("../../middlewares/autorization");

const {
    getAllCities,
    createCities,
	getCitiesById,
    updateCitiesById,
    deleteCitiesById
} = require('./controller');

//SOURCE ROUTES
const router = express.Router();

router.get('/getall', autenticate, autorization, (req, res) => {
	getAllCities()
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

router.post('/create', autenticate, autorization, (req, res) => {
	const reqSource = req.body;
	createCities(reqSource)
		.then((source) => {
			res.status(200).json(source);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

router.get('/:id', autenticate, autorization, (req, res) => {
	const { id } = req.params;
	getCitiesById(id)
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
	updateCitiesById(id, data)
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
	deleteCitiesById(id, data)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});


module.exports = router;