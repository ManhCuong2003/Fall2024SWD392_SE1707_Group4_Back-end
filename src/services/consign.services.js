const consignRepository = require('../repository/consign.repository')
const CustomError = require('../utils/customError')


class ConsignService {

  async getAllConsignments() {
    const consignList = await consignRepository.getAllConsignments()
    return consignList
  }

  async getConsignById(id) {
    const consign = await consignRepository.getConsignmentById(id)
    if (!consign) {
      throw new CustomError(404, 'Consign order not found')
    }
    return consign
  }

  async getConsignByType(typeId) {
    const consign = await consignRepository.getConsignmentByType(typeId)
    if (!consign) {
      throw new CustomError(404, `There a no consign order of this type`)
    }
    return consign
  }

  async createConsignment(Consignment_Types, Customer_ID, koi_ID, Care_Time, Care_Fee, Consignment_Status, Payment_Method) {
    const createConsignment = await consignRepository.createConsignment(Consignment_Types, Customer_ID, koi_ID, Care_Time, Care_Fee, Consignment_Status, Payment_Method)
    if(!createConsignment) {
      throw new CustomError(400, "Create Consignment failed")
    }
    return createConsignment
  }
}

module.exports = new ConsignService()