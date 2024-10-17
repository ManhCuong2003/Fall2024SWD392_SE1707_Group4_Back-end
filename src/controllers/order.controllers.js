const orderServices = require('../services/order.services')

exports.getAllOrder = async (req, res) => {
  const response = await orderServices.getAllOrder()
  return res.status(200).json(response)
}

exports.getOrderById = async (req, res) => {
  const { orderId } = req.params
  const response = await orderServices.getOrderById(orderId)
  return res.status(200).json(response)
}

exports.createOrder = async (req, res) => {
  const { Customer_ID, Order_Date, Total_Order_Price, Order_Status, Payment_Method } = req.body
  const response = await orderServices.createOrder(Customer_ID, Order_Date, Total_Order_Price, Order_Status, Payment_Method)
  return res.status(200).json(response)
}

exports.getAllOrderDetails = async (req, res) => {
  const {orderId} = req.params
  const response = await orderServices.getAllOrderDetails(orderId)
  return res.status(200).json(response)
}

exports.getOrderDetail = async (req, res) => {
  const { orderId, koiId } = req.params
  const response = await orderServices.getOrderDetail(orderId, koiId)
  return res.status(200).json(response)
}

exports.createOrderDetail = async (req, res) => {
  const {orderId, koiId, quantity, totalPrice} = req.params
  const response = await orderServices.createOrderDetail(orderId, koiId, quantity, totalPrice)
  return res.status(200).json(response)
}