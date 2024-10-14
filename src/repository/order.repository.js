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
}

module.exports = new OrderRepository()
