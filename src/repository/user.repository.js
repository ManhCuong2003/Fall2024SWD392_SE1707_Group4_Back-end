const { sql } = require('../config/database.config')

class UserRepository {
  async findUserByEmail(email) {
    const result =
      await sql.query`SELECT password FROM Users WHERE email = ${email}`
    return result.recordset[0]
  }

  async createUser({ email, password, fullname, address, phone }) {
    const result =
      await sql.query`INSERT INTO Users OUTPUT INSERTED.email VALUES  (${email}, ${password}, ${fullname}, ${address}, ${phone}, 1, 1, '','', GETDATE(), GETDATE())`
    console.log(result)

    return result.recordset[0]
  }
}

module.exports = new UserRepository()
