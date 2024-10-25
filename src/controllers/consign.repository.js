const consignServices = require('../services/consign.services')

exports.getAllConsignments = async (req, res) => {
  const response = await consignServices.getAllConsignments()
  return res.status(200).json(response)
}

exports.getConsignById = async (req, res) => {
  const { consignId } = req.params
  const response = await consignServices.getConsignById(consignId)
  return res.status(200).json(response)
}

exports.getConsignsByType = async (req, res) => {
    const { typeId } = req.params
    const response = await consignServices.getConsignById(typeId)
    return res.status(200).json(response)
  }

exports.createConsignment = async (req, res) => {
  const { Consignment_Types, Customer_ID, koi_ID, Care_Time, Care_Fee, Consignment_Status, Payment_Method } = req.body
  const response = await consignServices.createConsignment(Consignment_Types, Customer_ID, koi_ID, Care_Time, Care_Fee, Consignment_Status, Payment_Method)
  return res.status(200).json(response)
}
