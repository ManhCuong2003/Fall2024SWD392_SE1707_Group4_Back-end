const { sql } = require('../../config/database.config')

exports.loginValidator = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    const err = new Error('Required fields are missing.')
    err.status = 400
    return next(err)
  }
  try {
    const result = await new sql.Request()
      .input('email', email)
      .input('password', password).query`SELECT id,email FROM [USER] 
      WHERE email = @email AND password = @password`
    const user = result.recordset[0]

    if (!user) {
      const err = new Error('Invalid email or password.')
      err.status = 401
      return next(err)
    }
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}
