const productServices = require('../services/product.services')

exports.getAllProductsController = async (req, res) => {
  const response = await productServices.getAllProduct()
  return res.status(200).json(response)
}
