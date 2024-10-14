const OrderRepository = require('../repository/order.repository')
const CustomError = require('../utils/customError')

class ProductService {
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
}

module.exports = new OrderService()