const express = require('express')
const { loginValidator } = require('../middlewares/user.middlewares')
const { loginController } = require('../controllers/user.controllers')
const wrapAsync = require('../utils/handler')
const userRoute = express.Router()

/**
 * description: login route
 * path: /users/login/
 * body: {email, password}
 */
userRoute.post('/login', loginValidator, wrapAsync(loginController))

module.exports = userRoute
