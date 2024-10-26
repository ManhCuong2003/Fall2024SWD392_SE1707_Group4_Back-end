const productServices = require('../services/product.services')

exports.getAllProductsController = async (req, res) => {
  const response = await productServices.getAllProduct()
  return res.status(200).json(response)
}

exports.getProductById = async (req, res) => {
  const { productId } = req.params
  const response = await productServices.getProductById(productId)
  return res.status(200).json(response)
}

exports.createProduct = async (req, res) => {
  const {
    koi_name,
    koi_gender,
    koi_age,
    koi_size,
    koi_price,
    koi_image_url,
    koi_color, Species_ID,
    koi_quantity,
    koi_description
  } = req.body
  const response = await productServices.createProduct(
    koi_name,
    koi_gender,
    koi_age,
    koi_size,
    koi_price,
    koi_image_url,
    koi_color, Species_ID,
    koi_quantity,
    koi_description
  )
  return res.status(200).json(response)
}

exports.updateProduct = async (req, res) => {
  const {
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
    } = req.body // req.params ?
    const response = await productServices.updateProduct(
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
    )
    return res.status(200).json(response)
}

exports.deleteProduct = async (req, res) => {
  const {koi_id} = req.params
  const response = await productServices.deleteProduct(koi_id)
  return res.status(200).json(response)
}