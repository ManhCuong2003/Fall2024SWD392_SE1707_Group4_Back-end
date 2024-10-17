const orderRepository = require('../repository/order.repository')
const OrderRepository = require('../repository/order.repository')
const CustomError = require('../utils/customError')

class OrderService {
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

  async createOrder(Customer_ID, Order_Date, Total_Order_Price, Order_Status, Payment_Method) {
    const createOrder = await OrderRepository.createOrder(Customer_ID, Order_Date, Total_Order_Price, Order_Status, Payment_Method)
    if(!createOrder) {
      throw new CustomError(400, "Create Order failed")
    }
    return createOrder
  }

  async getAllOrderDetails(orderId) {
    const orderDetailList = orderRepository.getAllOrderDetails(orderId);
    return orderDetailList;
  }

  async getOrderDetail(orderId, koiId) {
    const orderDetail = await orderRepository.getOrderDetail(orderId, koiId);
    if (!orderDetail) {
      throw new CustomError(404, 'Order detail not found')
    }
    return orderDetail
  }

  async createOrderDetail({orderId, koiId, quantity, totalPrice}) {
    const createOrderDetail = await orderRepository.createOrderDetail(orderId, koiId, quantity, totalPrice);
    if(!createOrderDetail) {
      throw new CustomError(400, "Create Order detail failed")
    }
    return createOrderDetail
  }
}

module.exports = new OrderService()