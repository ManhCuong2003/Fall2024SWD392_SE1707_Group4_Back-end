const express = require('express')
const { accessTokenValidator } = require('../middlewares/auth.middlewares')
const wrapAsync = require('../utils/handler')
const {
  getAllProductsController,
  getProductById
} = require('../controllers/product.controllers')
const productRoute = express.Router()

productRoute.get('/', wrapAsync(getAllProductsController))
productRoute.get('/:productId', wrapAsync(getProductById))

module.exports = productRoute
