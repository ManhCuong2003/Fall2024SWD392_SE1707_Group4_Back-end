const express = require('express')
const authRoute = require('./auth.routes')
const userRoute = require('./user.routes')
const mainRoute = express.Router()

mainRoute.use('/auth', authRoute)
mainRoute.use('/users', userRoute)

module.exports = mainRoute
