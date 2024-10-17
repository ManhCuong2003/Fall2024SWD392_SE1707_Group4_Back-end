<<<<<<< HEAD
const orderServices = require('../services/product.services')
=======
const orderServices = require('../services/order.services')
>>>>>>> 84558293ea243bbd5286534675edcb0f529b4782

exports.getAllOrder = async (req, res) => {
  const response = await orderServices.getAllOrder()
  return res.status(200).json(response)
}

exports.getOrderById = async (req, res) => {
  const { orderId } = req.params
  const response = await orderServices.getOrderById(orderId)
  return res.status(200).json(response)
<<<<<<< HEAD
=======
}

exports.createOrder = async (req, res) => {
  const { Customer_ID, Order_Date, Total_Order_Price, Order_Status, Payment_Method } = req.params
  const response = await orderServices.createOrder(Customer_ID, Order_Date, Total_Order_Price, Order_Status, Payment_Method)
  return res.status(200).json(response)
>>>>>>> 84558293ea243bbd5286534675edcb0f529b4782
}