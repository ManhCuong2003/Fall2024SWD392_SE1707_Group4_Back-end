const express = require('express')
const { accessTokenValidator } = require('../middlewares/auth.middlewares')
const wrapAsync = require('../utils/handler')
const {
  getAllOrder,
  getOrderById,
  createOrder
} = require('../controllers/order.controllers')
const orderRoute = express.Router()

orderRoute.get('/', wrapAsync(getAllOrder))
orderRoute.get('/:orderId', wrapAsync(getOrderById))
orderRoute.get('/checkout-page', wrapAsync(createOrder))

module.exports = orderRoute
