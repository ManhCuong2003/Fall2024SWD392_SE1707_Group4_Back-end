const orderServices = require('../services/product.services')

exports.getAllOrder = async (req, res) => {
  const response = await orderServices.getAllOrder()
  return res.status(200).json(response)
}

exports.getOrderById = async (req, res) => {
  const { orderId } = req.params
  const response = await orderServices.getOrderById(orderId)
  return res.status(200).json(response)
}