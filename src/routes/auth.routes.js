const express = require('express')

const wrapAsync = require('../utils/handler')

const {
  loginController,
  registerController
} = require('../controllers/user.controllers')
const {
  loginValidator,
  registerValidator
} = require('../middlewares/user.middlewares')

const authRoute = express.Router()

/**
 * description: login
 * path: /auth/login
 * body: {email, password}
 */
authRoute.post('/login', loginValidator, wrapAsync(loginController))

/**
 * description: register
 * path: /auth/register
 * body: {email, password, fullname, adress, phone}
 */
authRoute.post('/register', registerValidator, wrapAsync(registerController))

module.exports = authRoute
