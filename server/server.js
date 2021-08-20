const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

//ENV
const config = require('./config/index');
//Routes
const userRoutes = require('./components/users/network');
const statusRoutes = require('./components/status/network');
const orderRoutes = require('./components/orders/network');
const citiesRoutes = require('./components/cities/network');
const clientRoutes = require('./components/clients/network');
const vehicleTypesRoutes = require('./components/vehicleType/network');
//Database
const db = require('./database/index');
//Express
const app = express();
app.use(helmet.permittedCrossDomainPolicies({ permittedPolicies: 'by-content-type' }));
app.use(cors());
app.options('*', cors());
app.use(express.json());
//Routes Implementacion
app.use('/user', userRoutes);
app.use('/status', statusRoutes);
app.use('/order', orderRoutes);
app.use('/cities', citiesRoutes);
app.use('/client', clientRoutes);
app.use('/vehicleTypes', vehicleTypesRoutes);

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Error interno');
});

//SERVER PORT
app.listen(config.port, () => {
	console.log(`Api escuchando en http://localhost:${config.port}`);
});