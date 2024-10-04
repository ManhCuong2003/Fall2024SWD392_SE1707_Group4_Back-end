const productServices = require('../services/product.services')

exports.getAllProductsController = async (req, res) => {
  const response = await productServices.getAllProduct()
  return res.status(200).json(response)
}

exports.getProductById = async (req, res) => {
  const { productId } = req.params
  const response = await productServices.getProductById(productId)
  return res.status(200).json(response)
}
