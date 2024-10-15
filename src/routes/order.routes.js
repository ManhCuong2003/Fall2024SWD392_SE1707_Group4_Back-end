const express = require('express')
const { accessTokenValidator } = require('../middlewares/auth.middlewares')
const wrapAsync = require('../utils/handler')
const {
  getAllOrder,
<<<<<<< HEAD
  getOrderById
=======
  getOrderById,
  createOrder
>>>>>>> 84558293ea243bbd5286534675edcb0f529b4782
} = require('../controllers/order.controllers')
const orderRoute = express.Router()

orderRoute.get('/', wrapAsync(getAllOrder))
orderRoute.get('/:orderId', wrapAsync(getOrderById))
<<<<<<< HEAD
=======
orderRoute.get('/checkout-page', wrapAsync(createOrder))
>>>>>>> 84558293ea243bbd5286534675edcb0f529b4782

module.exports = orderRoute
