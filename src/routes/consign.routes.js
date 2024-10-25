const express = require('express')
const { accessTokenValidator } = require('../middlewares/auth.middlewares')
const wrapAsync = require('../utils/handler')
const {
  getAllConsignments,
  getConsignById,
  getConsignByType,
  createConsignment
} = require('../controllers/consign.controllers')
const consignRoute = express.Router()

consignRoute.get('/', wrapAsync(getAllConsignments))

consignRoute.get('/:consignId', wrapAsync(getConsignById))

consignRoute.get('/:typeId', wrapAsync(getConsignByType))

consignRoute.get('/', wrapAsync(createConsignment))