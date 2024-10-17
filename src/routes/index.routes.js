const express = require('express')
const authRoute = require('./auth.routes')
const userRoute = require('./user.routes')
const productRoute = require('./product.routes')
const paymentRoute = require('./payment.routes')
const mainRoute = express.Router()

mainRoute.use('/auth', authRoute)
mainRoute.use('/users', userRoute)
mainRoute.use('/products', productRoute)
mainRoute.use('/payment', paymentRoute)

module.exports = mainRoute
