const { sql } = require('../config/database.config')

class UserRepository {
  async findUserByEmail(email) {
    const result =
      await sql.query`SELECT password FROM Users WHERE email = ${email}`
    return result.recordset[0]
  }

  async createStaff({ email, password, fullname, address, phone }) {
    const result =
      await sql.query`INSERT INTO Users OUTPUT INSERTED.email VALUES  (${email}, ${password}, ${fullname}, ${address}, ${phone}, 1, 2, '','', GETDATE(), GETDATE())`
    return result.recordset[0]
  }

  async createCustomer({ email, password, fullname, address, phone }) {
    const result =
      await sql.query`INSERT INTO Users OUTPUT INSERTED.email VALUES  (${email}, ${password}, ${fullname}, ${address}, ${phone}, 1, 1, '','', GETDATE(), GETDATE())`
    return result.recordset[0]
  }

  async getUserInfor(email) {
    const result =
      await sql.query`SELECT user_ID, email, userfullname, address, phone, role_name FROM Users INNER JOIN Roles ON Users.role_id = Roles.role_id Where email = ${email}`
    return result.recordset[0]
  }

  async updateUser(user) {
    const result = 
      await sql.query`UPDATE Users 
      SET password = ${user.password},
          userfullname = ${user.fullname},
          address = ${user.address},
          phone = ${user.phone},
          user_status = ${user.status},
          provider = ${user.provider},
          provider_id = ${user.providerId},
          updated_at = GETDATE()
      WHERE user_Id = ${user.userId};`
      return result.recordset[0]
  }
  
}

module.exports = new UserRepository()
