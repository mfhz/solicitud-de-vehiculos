const jwt = require("jsonwebtoken");
const bCrypt = require("bcrypt");
const orderModel = require("../../database/orders/orderModel");
const config = require("../../config/index");


const getAllOrders = () => {
	return new Promise((res, rejc) => {
		orderModel
			.findAll()
			.then((orders) => {
				res(orders);
			})
			.catch((error) => {
                // console.log(error);
				rejc({ status: 500, message: 'intenta de nuevo' });
			});
	});
};

const createOrder = (data, id) => {
    data.userId = id;
	return new Promise((res, rejc) => {
        if (!data.comments) {
                rejc({ status: 400, message: 'Se requiere de todos los campos para crear un servicio' });
            } else {                
                orderModel
                .create(data)
                .then((order) => {
                    res({ message: 'Servicio creado' });
                })
                .catch((error) => {
                    // console.log(error);
                    rejc({ status: 500, message: 'intenta de nuevo' });
                });
            }
	});
};

const getOrderById = (id) => {
	return new Promise((res, rejc) => {
		orderModel
			.findByPk(id, {})
			.then((order) => {
				if (order) {
					res({ order: order });
				} else {
					rejc({ status: 404, message: `El servicio no existe` });
				}
			})
			.catch((error) => {
				console.log(error);
				rejc({ status: 500, message: 'intenta de nuevo' });
			});
	});
};

const updateOrderById = (id, data) => {
	return new Promise((res, rejc) => {
        orderModel        
            .update(data, { where: { id: id } })
            .then((response) => {
                if (response[0] === 1) {
                    res({ message: 'Servicio actualizado' });
                } else {
                    rejc({ status: 400, message: 'No se puede actualizar el servicio' });
                }
            })
            .catch((error) => {
                console.log(error);
                rejc({ status: 500, message: 'Intente de nuevo' });
            });
    });
};

const deleteOrderById = (id, data) => {
	return new Promise((res, rejc) => {
		orderModel
			.update(data, { where: { id: id } })
			.then((response) => {
				if (response == 1) {
					res({ message: 'Servicio eliminado' });
				} else {
					rejc({ status: 400, message: 'El servicio no existe o no puede ser eliminado' });
				}
			})
			.catch((error) => {
				rejc({ status: 500, message: 'intenta de nuevo' });
			});
	});
};






module.exports = {
    getAllOrders,
	createOrder,
	getOrderById,
	updateOrderById,
	deleteOrderById
};