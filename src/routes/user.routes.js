const express = require('express')
const userRoute = express.Router()
const { accessTokenValidator } = require('../middlewares/auth.middlewares')
const wrapAsync = require('../utils/handler')
const { getCurrentUserController } = require('../controllers/user.controllers')

userRoute.get(
  '/get-current-user',
  accessTokenValidator,
  wrapAsync(getCurrentUserController)
)

module.exports = userRoute
