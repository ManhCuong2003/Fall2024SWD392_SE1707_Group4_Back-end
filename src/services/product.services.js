const productRepositoty = require('../repository/product.repositoty');
const CustomError = require('../utils/customError');

class ProductService {
  async getAllProduct() {
    const productList = await productRepositoty.getAllProduct();
    return productList;
  }

  async getProductById(id) {
    const product = await productRepositoty.getProducById(id);
    if (!product) {
      throw new CustomError(404, 'Koi fish not found');
    }
    return product;
  }
}

module.exports = new ProductService();
