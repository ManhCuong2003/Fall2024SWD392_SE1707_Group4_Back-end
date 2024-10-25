const express = require('express')
const axios = require('axios').default // npm install axios
const CryptoJS = require('crypto-js') // npm install crypto-js
const moment = require('moment') // npm install moment
const dotenv = require('dotenv')
const orderServices = require('../services/order.services')
const paymentRoute = express.Router()

dotenv.config()

const config = {
  app_id: process.env.APP_ID,
  key1: process.env.KEY_1,
  key2: process.env.KEY_2,
  endpoint: 'https://sb-openapi.zalopay.vn/v2/create'
}

paymentRoute.post('/make-payment', async (req, res) => {
  const embed_data = {
    redirecturl: 'http://192.168.150.1:5173/customer-dashboard'
  }
  const { cartItems, total, user } = req.body

  const items = cartItems.map((item) => ({
    id: item.koi_id,
    name: item.koi_name,
    quantity: item.quantity,
    price: item.koi_price
  }))
  const transID = Math.floor(Math.random() * 1000000)
  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
    app_user: user.user_ID,
    app_time: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: total,
    callback_url:
      'https://bbbe-2405-4802-8011-1230-780b-6f5e-adce-bea4.ngrok-free.app/api/payment/callback',
    description: `Payment for the order`,
    bank_code: ''
  }

  // appid|app_trans_id|appuser|amount|apptime|embeddata|item
  const data =
    config.app_id +
    '|' +
    order.app_trans_id +
    '|' +
    order.app_user +
    '|' +
    order.amount +
    '|' +
    order.app_time +
    '|' +
    order.embed_data +
    '|' +
    order.item
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString()

  try {
    const result = await axios.post(config.endpoint, null, { params: order })
    return res.status(200).json(result.data)
  } catch (error) {
    console.log(error)
  }
})

paymentRoute.post('/callback', async (req, res) => {
  let result = {}

  try {
    let dataStr = req.body.data
    let reqMac = req.body.mac
    let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString()
    console.log('mac =', mac)

    // kiểm tra callback hợp lệ (đến từ ZaloPay server)
    if (reqMac !== mac) {
      // callback không hợp lệ
      result.return_code = -1
      result.return_message = 'mac not equal'
    } else {
      // thanh toán thành công
      // merchant cập nhật trạng thái cho đơn hàng
      let dataJson = JSON.parse(dataStr, config.key2)
      const products = JSON.parse(dataJson.item)
      const user_id = parseInt(dataJson.app_user)
      const order_id = await orderServices.createOrder(
        user_id,
        new Date(),
        dataJson.amount,
        4,
        'ZaloPay'
      )
      console.log('order_id: ', order_id)
      await orderServices.addOrderDetail(order_id, products)
      result.return_code = 1
      result.return_message = 'success'
    }
  } catch (ex) {
    result.return_code = 0 // ZaloPay server sẽ callback lại (tối đa 3 lần)
    result.return_message = ex.message
  }

  // thông báo kết quả cho ZaloPay server
  res.json(result)
})

module.exports = paymentRoute
