const express = require('express')
const axios = require('axios').default // npm install axios
const CryptoJS = require('crypto-js') // npm install crypto-js
const moment = require('moment') // npm install moment
const dotenv = require('dotenv')
const paymentRoute = express.Router()

dotenv.config()

const config = {
  app_id: process.env.APP_ID,
  key1: process.env.KEY_1,
  key2: process.env.KEY_2,
  endpoint: 'https://sb-openapi.zalopay.vn/v2/create'
}

paymentRoute.post('/make-payment', async (req, res) => {
  const embed_data = {}

  const items = [{}]
  const transID = Math.floor(Math.random() * 1000000)
  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
    app_user: 'user123',
    app_time: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: 50000,
    callback_url:
      'https://f96a-118-69-70-166.ngrok-free.app/api/payment/callback',
    description: `Payment for the order #${transID}`,
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

paymentRoute.post('/callback', (req, res) => {
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
      console.log(
        "update order's status = success where app_trans_id =",
        dataJson['app_trans_id']
      )

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

paymentRoute.post('/check-status-order/:app_trans_id', async (req, res) => {
  const { app_trans_id } = req.params

  const postData = {
    app_id: config.app_id,
    app_trans_id,
    mac: ''
  }

  const data = postData.app_id + '|' + postData.app_trans_id + '|' + config.key1 // appid|app_trans_id|key1
  postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString()

  const postConfig = {
    method: 'post',
    url: 'https://sb-openapi.zalopay.vn/v2/query',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(postData)
  }

  try {
    const result = await axios(postConfig)
    return res
      .status(StatusCodes.OK)
      .json(omit(result.data, 'sub_return_code', 'sub_return_message'))
    /**
     ** Kết quả mẫu:
      {
        "return_code": 1, // 1 : Thành công, 2 : Thất bại, 3 : Đơn hàng chưa thanh toán hoặc giao dịch đang xử lý
        "return_message": "",
        "sub_return_code": 1,
        "sub_return_message": "",
        "is_processing": false,
        "amount": 50000,
        "zp_trans_id": 240331000000175,
        "server_time": 1711857138483,
        "discount_amount": 0
      }
    */
  } catch (error) {
    console.log('🚀 ~ error:', error)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
})

module.exports = paymentRoute
