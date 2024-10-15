const OrderRepository = require('../repository/order.repository')
const CustomError = require('../utils/customError')

<<<<<<< HEAD
class ProductService {
=======
class OrderService {
>>>>>>> 84558293ea243bbd5286534675edcb0f529b4782
  async getAllOrder() {
    const orderList = await OrderRepository.getAllOrder()
    return orderList
  }

  async getOrderById(id) {
    const order = await OrderRepository.getOrderById(id)
    if (!order) {
      throw new CustomError(404, 'Order not found')
    }
    return order
  }
<<<<<<< HEAD
=======

  async createOrder(Customer_ID, Order_Date, Total_Order_Price, Order_Status, Payment_Method) {
    const createOrder = await OrderRepository.createOrder(Customer_ID, Order_Date, Total_Order_Price, Order_Status, Payment_Method)
    if(!createOrder) {
      throw new CustomError(400, "Create Order failed")
    }
    return createOrder
  }
>>>>>>> 84558293ea243bbd5286534675edcb0f529b4782
}

module.exports = new OrderService()