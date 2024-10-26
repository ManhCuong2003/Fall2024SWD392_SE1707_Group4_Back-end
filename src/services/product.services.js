const productRepositoty = require('../repository/product.repositoty')
const CustomError = require('../utils/customError')

class ProductService {
  async getAllProduct() {
    const productList = await productRepositoty.getAllProduct()
    return productList
  }

  async getProductById(id) {
    const product = await productRepositoty.getProducById(id)
    if (!product) {
      throw new CustomError(404, 'Koi fish not found')
    }
    return product
  }

  async createProduct(
    koi_name,
    koi_gender,
    koi_age,
    koi_size,
    koi_price,
    koi_image_url,
    koi_color, Species_ID,
    koi_quantity,
    koi_description
  ) {
    try {
      const createProduct = await productRepositoty.createProduct({
        koi_name,
        koi_gender,
        koi_age,
        koi_size,
        koi_price,
        koi_image_url,
        koi_color, Species_ID,
        koi_quantity,
        koi_description
      })

      if (!createProduct) {
        throw new CustomError(400, 'Create Koi failed')
      }
      return createProduct
    } catch (error) {
      console.log(error)
    }
  }

  async updateProduct(
    koi_id,
    koi_name,
    koi_gender,
    koi_age,
    koi_size,
    koi_price,
    koi_image_url,
    koi_color,
    Species_ID,
    koi_quantity,
    koi_description,
    koi_status,
    koi_alive
  ) {
    try {
      const updateProduct = await productRepositoty.updateProduct({
        koi_id,
        koi_name,
        koi_gender,
        koi_age,
        koi_size,
        koi_price,
        koi_image_url,
        koi_color,
        Species_ID,
        koi_quantity,
        koi_description,
        koi_status,
        koi_alive
      })

      if (!updateProduct) {
        throw new CustomError(400, 'update Koi failed')
      }
      return updateProduct
    } catch (error) {
      console.log(error)
    }
  }

  async deleteProduct(id) {
    const product = await productRepositoty.deleteProduct(id)
    if (!product) {
      throw new CustomError(400, 'Koi fish remove fail')
    }
    return product
  }

}

module.exports = new ProductService()
