const express = require('express')
const userRoute = express.Router()
const { accessTokenValidator } = require('../middlewares/auth.middlewares')
const wrapAsync = require('../utils/handler')
const {
  getCurrentUserController,
  UpdateUserController,
  getAllOrderByUserController
} = require('../controllers/user.controllers')

userRoute.get(
  '/get-current-user',
  accessTokenValidator,
  wrapAsync(getCurrentUserController)
)

userRoute.get('/updateUser', wrapAsync(UpdateUserController))

/**
 * get all order of user
 * path: /api/users/:userId/orders
 */
userRoute.get('/:userId/orders', wrapAsync(getAllOrderByUserController))

module.exports = userRoute
