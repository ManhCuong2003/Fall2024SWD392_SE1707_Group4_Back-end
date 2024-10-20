const express = require('express')
const userRoute = express.Router()
const { accessTokenValidator } = require('../middlewares/auth.middlewares')
const wrapAsync = require('../utils/handler')
const { getCurrentUserController,
        UpdateUserController
 } = require('../controllers/user.controllers')

userRoute.get(
  '/get-current-user',
  accessTokenValidator,
  wrapAsync(getCurrentUserController)
)

userRoute.get(
  '/updateUser',
  wrapAsync(UpdateUserController)
)

module.exports = userRoute
