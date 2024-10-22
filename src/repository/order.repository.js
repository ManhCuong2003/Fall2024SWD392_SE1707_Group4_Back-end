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

  async createOrder({
    Customer_ID,
    Order_Date,
    Total_Order_Price,
    Order_Status,
    Payment_Method
  }) {
    try {
      const result =
        await sql.query`INSERT INTO Orders (Customer_ID, Order_Date, Total_Order_Price, Order_Status, Payment_Method) OUTPUT INSERTED.Order_ID VALUES (${Customer_ID}, ${Order_Date}, ${Total_Order_Price}, ${Order_Status}, ${Payment_Method})`
      return result.recordset[0]
    } catch (error) {
      console.log(error)
    }
  }

  async addOrderDetail(order_id, products) {
    for (let product of products) {
      try {
        await sql.query`
        INSERT INTO Order_Detail (Order_ID, Koi_ID, Quantity) VALUES (${
          order_id.Order_ID
        }, ${product.id}, ${product.quantity}); 
        UPDATE Kois SET koi_status = ${0}, koi_quantity = koi_quantity - ${
          product.quantity
        } WHERE koi_id = ${product.id};
        `
      } catch (error) {
        console.log('add order detail error: ', error)
      }
    }
  }

  async getAllOrderByUserId(userId) {
    const result = await sql.query`
            SELECT 
                Orders.Order_ID, 
                Order_Status.Order_Status_Name, 
                Kois.koi_id, 
                Kois.koi_name, 
                Order_Detail.Quantity, 
                Kois.koi_price
            FROM Orders
            INNER JOIN Order_Status ON Orders.Order_Status = Order_Status.Order_Status_ID
            INNER JOIN Order_Detail ON Orders.Order_ID = Order_Detail.Order_ID
            INNER JOIN Kois ON Order_Detail.Koi_ID = Kois.koi_id
            WHERE Orders.Customer_ID = ${userId};
        `
    let orders = {}
    result.recordset.forEach((row) => {
      if (!orders[row.Order_ID]) {
        orders[row.Order_ID] = {
          id: row.Order_ID,
          status: row.Order_Status_Name,
          items: []
        }
      }
      orders[row.Order_ID].items.push({
        koi_id: row.koi_id,
        koi_name: row.koi_name,
        quantity: row.Quantity,
        price: row.koi_price
      })
    })

    // Chuyển đối tượng thành mảng
    let formattedOrders = Object.values(orders)
    console.log(formattedOrders)
    return formattedOrders
  }
}
// class OrderDetailRepository {
//   async getAllOrderDetails(orderId) {
//     const result =
//       await sql.query`SELECT * FROM Order_Detail WHERE Order_ID = ${orderId}`
//     return result.recordset
//   }
//   async getOrderDetail(orderId, koiId) {
//     const result =
//       await sql.query`SELECT * FROM Order_Detail WHERE Order_ID = ${orderId} and Koi_ID = ${koiId}`
//     return result.recordset[0]
//   }
//   async createOrderDetail({ orderId, koiId, quantity, totalPrice }) {
//     const result =
//       await sql.query`INSERT INTO Order_Detail (Order_ID, Koi_ID, Quantity, Total_Price)
//         VALUES(${orderId}, ${koiId}, ${quantity}, ${totalPrice})`

//     return result.recordset[0]
//   }
//   // async updateOrder()
// }
module.exports = new OrderRepository()
