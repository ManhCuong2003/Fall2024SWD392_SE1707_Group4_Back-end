const express = require('express')
const { loginValidator } = require('./user.middlewares')
const { loginController } = require('./user.controllers')
const wrapAsync = require('../../utils/handler')
const userRoute = express.Router()

/**
 * description: login route
 * path: /users/login/
 * body: {email, password}
 */
userRoute.post('/login', loginValidator, wrapAsync(loginController))

module.exports = userRoute
