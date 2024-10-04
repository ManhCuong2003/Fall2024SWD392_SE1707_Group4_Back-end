const productRepositoty = require('../repository/product.repositoty')

class ProductService {
  async getAllProduct() {
    const productList = await productRepositoty.getAllProduct()
    return productList
  }
}

module.exports = new ProductService()
