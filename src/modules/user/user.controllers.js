const userServices = require('./user.services')

exports.loginController = async (req, res) => {
  const { id, email } = req.user
  const result = await userServices.login(id, email)
  return res.status(200).json(result)
}
