const express = require('express')
const authRoute = require('./auth.routes')
const userRoute = require('./user.routes')
const productRoute = require('./product.routes')
const mainRoute = express.Router()

mainRoute.use('/auth', authRoute)
mainRoute.use('/users', userRoute)
mainRoute.use('/products', productRoute)

module.exports = mainRoute
