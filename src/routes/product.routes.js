const express = require('express')
const { accessTokenValidator } = require('../middlewares/auth.middlewares')
const wrapAsync = require('../utils/handler')
const {
  getAllProductsController,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/product.controllers')
const productRoute = express.Router()

productRoute.get('/', wrapAsync(getAllProductsController))
productRoute.get('/:productId', wrapAsync(getProductById))
productRoute.get('/', wrapAsync(createProduct))
productRoute.get('/', wrapAsync(updateProduct))
productRoute.get('/:productId', wrapAsync(deleteProduct))

module.exports = productRoute
