const jwt = require('jsonwebtoken')
const CustomError = require('../utils/customError')

exports.accessTokenValidator = (req, res, next) => {
  const authHeader = req.headers['authorization']
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new CustomError(401, 'Unauthorized'))
  }
  const access_token = authHeader.split(' ')[1]
  try {
    const decode_token = jwt.verify(
      access_token,
      process.env.JWT_SECRET_ACCESS_TOKEN
    )
    req.decode_token = decode_token
    next()
  } catch (error) {
    next(new CustomError(null, error.message))
  }
}
