const { sql } = require('../config/database.config')

class OrderRepository {
  async getAllOrder() {
    const result = await sql.query`SELECT * FROM Orders`
    return result.recordset
  }
  async getOrderById(id) {
    const result = await sql.query`SELECT * FROM Orders WHERE Order_ID = ${id}`
    return result.recordset[0]
  }
  async createOrder({Customer_ID, Order_Date, Total_Order_Price, Order_Status, Payment_Method}) {
    const result =
      await sql.query`INSERT INTO Orders (Customer_ID, Order_Date, Total_Order_Price, Order_Status, Payment_Method) VALUES (${Customer_ID}, ${Order_Date}, ${Total_Order_Price}, ${Order_Status}, ${Payment_Method})`
    return result.recordset[0]
  }
  // async updateOrder()
}
class OrderDetailRepository {
  async getAllOrderDetails(orderId) {
    const result = await sql.query`SELECT * FROM Order_Detail WHERE Order_ID = ${orderId}`
    return result.recordset
  }
  async getOrderDetail(orderId, koiId) {
    const result = await sql.query`SELECT * FROM Order_Detail WHERE Order_ID = ${orderId} and Koi_ID = ${koiId}`
    return result.recordset[0]
  }
  async createOrderDetail({orderId, koiId, quantity, totalPrice}) {
    const result =
      await sql.query`INSERT INTO Order_Detail (Order_ID, Koi_ID, Quantity, Total_Price)
        VALUES(${orderId}, ${koiId}, ${quantity}, ${totalPrice})`

    return result.recordset[0]
  }
  // async updateOrder()
}

module.exports = new OrderDetailRepository()
module.exports = new OrderRepository()
