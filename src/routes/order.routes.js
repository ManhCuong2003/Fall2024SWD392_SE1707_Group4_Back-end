const express = require('express')
const { accessTokenValidator } = require('../middlewares/auth.middlewares')
const wrapAsync = require('../utils/handler')
const {
  getAllOrder,
  getOrderById,
  createOrder,
  getAllOrderDetails,
  getOrderDetail,
  createOrderDetail
} = require('../controllers/order.controllers')
const orderRoute = express.Router()

orderRoute.get('/', wrapAsync(getAllOrder))

orderRoute.get('/:orderId', wrapAsync(getOrderById))

orderRoute.get('/', wrapAsync(createOrder))

orderRoute.get('/:orderId/', wrapAsync(getAllOrderDetails))

orderRoute.get('/:orderId/:koiId', wrapAsync(getOrderDetail))


module.exports = orderRoute
