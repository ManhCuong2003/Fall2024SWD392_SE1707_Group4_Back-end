const express = require('express')
const { accessTokenValidator } = require('../middlewares/auth.middlewares')
const wrapAsync = require('../utils/handler')
const {
  getAllProductsController
} = require('../controllers/product.controllers')
const productRoute = express.Router()

productRoute.get('/', wrapAsync(getAllProductsController))

module.exports = productRoute
