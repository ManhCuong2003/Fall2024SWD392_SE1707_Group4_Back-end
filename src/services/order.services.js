const orderRepository = require('../repository/order.repository')
const CustomError = require('../utils/customError')

class OrderService {
  async getAllOrder() {
    const orderList = await orderRepository.getAllOrder()
    return orderList
  }

  async getOrderById(id) {
    const order = await orderRepository.getOrderById(id)
    if (!order) {
      throw new CustomError(404, 'Order not found')
    }
    return order
  }

  async createOrder(
    Customer_ID,
    Order_Date,
    Total_Order_Price,
    Order_Status,
    Payment_Method
  ) {
    try {
      const createOrder = await orderRepository.createOrder({
        Customer_ID,
        Order_Date,
        Total_Order_Price,
        Order_Status,
        Payment_Method
      })

      if (!createOrder) {
        throw new CustomError(400, 'Create Order failed')
      }
      return createOrder
    } catch (error) {
      console.log(error)
    }
  }

  async addOrderDetail(order_id, products) {
    await orderRepository.addOrderDetail(order_id, products)
  }

  async getAllOrderByUserId(userId) {
    return await orderRepository.getAllOrderByUserId(userId)
  }

  async updateOrderStatus(order_id, newStatus) {
    await orderRepository.updateOrderStatus(order_id, newStatus)
  }
}

module.exports = new OrderService()
