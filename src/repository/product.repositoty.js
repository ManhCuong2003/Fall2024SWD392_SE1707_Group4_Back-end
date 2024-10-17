const { sql } = require('../config/database.config')

class ProductRepository {
  async getAllProduct() {
    const result = await sql.query`SELECT * FROM Kois`
    return result.recordset
  }
  async getProducById(id) {
    const result = await sql.query`SELECT * FROM Kois WHERE koi_id = ${id}`
    return result.recordset[0]
  }
  async createProduct() {
    
  }
}

module.exports = new ProductRepository()
