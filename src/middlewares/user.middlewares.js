const CustomError = require('../utils/customError')

exports.loginValidator = (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    const err = new CustomError(400, 'email and password are required.')
    return next(err)
  }
  next()
}

exports.registerValidator = (req, res, next) => {
  const { email, password, fullname, address, phone } = req.body

  if (!email || !password || !fullname || !address || !phone) {
    return next(
      new CustomError(
        400,
        'email, password, fullname, address, phone are required'
      )
    )
  }
  next()
}
