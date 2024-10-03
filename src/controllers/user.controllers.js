const userServices = require('../services/user.services')

exports.loginController = async (req, res) => {
  const { email, password } = req.body
  const result = await userServices.login(email, password)
  return res.status(200).json(result)
}

exports.registerController = async (req, res) => {
  const { email, password, fullname, address, phone } = req.body
  await userServices.registerUser({
    email,
    password,
    fullname,
    address,
    phone
  })
  return res.status(201).json({
    message: 'Registration successful.'
  })
}
