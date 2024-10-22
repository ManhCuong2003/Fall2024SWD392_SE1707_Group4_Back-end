const orderServices = require('../services/order.services')
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

exports.getCurrentUserController = async (req, res) => {
  const result = await userServices.getUserInfor(req.decode_token.email)
  return res.status(200).json(result)
}

exports.UpdateUserController = async (req, res) => {
  const { user } = req.body
  await userServices.UpdateUser(user)
  return res.status(201).json({
    message: 'Update successful.'
  })
}

exports.getAllOrderByUserController = async (req, res) => {
  const result = await orderServices.getAllOrderByUserId(req.params.userId)
  return res.status(200).json(result)
}
