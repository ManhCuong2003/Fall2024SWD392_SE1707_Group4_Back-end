exports.loginValidator = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    const err = new Error('Required fields are missing.')
    err.status = 400
    return next(err)
  }

  next()
}
