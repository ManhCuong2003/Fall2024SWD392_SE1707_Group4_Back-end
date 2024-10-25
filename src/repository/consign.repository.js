const { sql } = require('../config/database.config')

class ConsignRepository {
  async getAllConsignments() {
    const result = await sql.query`SELECT * FROM Consignments`
    return result.recordset
  }
  
  async getConsignmentById(id) {
    const result = await sql.query`SELECT * FROM Consignments WHERE Consignment_ID = ${id}`
    return result.recordset[0]
  }

  async getConsignmentByType(typeId) { // (bool) 1 is for care, 0 is for sales
    const result = await sql.query`SELECT * FROM Consignments WHERE Consignment_Types = ${typeId}`
    return result.recordset
  }

  async createConsignment({Consignment_Types, Customer_ID, koi_ID, Care_Time, Care_Fee, Consignment_Status, Payment_Method}) {
    const result =
      await sql.query`INSERT INTO Consignments 
      (Consignment_Types, Customer_ID, koi_id, Care_Time, Care_Fee, Consignment_Status, Payment_Method) 
      VALUES 
      (${Consignment_Types}, ${Customer_ID}, ${koi_ID}, ${Care_Time}, ${Care_Fee}, ${Consignment_Status}, ${Payment_Method})`

    return result.recordset[0]
  }
}

module.exports = new ConsignRepository()
