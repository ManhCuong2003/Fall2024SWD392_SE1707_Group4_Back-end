const jwt = require('jsonwebtoken')

class UserServices {
  async login(userId, email) {
    const access_token = jwt.sign(
      { userId, email },
      process.env.JWT_SECRET_ACCESS_TOKEN,
      { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRED_IN }
    )
    const refresh_token = jwt.sign(
      { userId, email },
      process.env.JWT_SECRET_REFRESH_TOKEN,
      { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRED_IN }
    )
    return { access_token, refresh_token }
  }
}

const userServices = new UserServices()
module.exports = userServices
