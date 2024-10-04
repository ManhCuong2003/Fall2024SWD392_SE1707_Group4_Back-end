const { sql } = require('../config/database.config')

class ProductRepository {
  async getAllProduct() {
    const result = await sql.query`SELECT * FROM Kois`
    return result.recordset
  }
}

module.exports = new ProductRepository()
