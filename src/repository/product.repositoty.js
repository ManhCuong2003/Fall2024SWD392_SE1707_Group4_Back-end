const { sql } = require('../config/database.config')

class ProductRepository {
  async getAllProduct() {
    const result = await sql.query`SELECT
    [koi_id]
      ,[koi_name]
      ,[koi_gender]
      ,[koi_age]
      ,[koi_size]
      ,[koi_price]
      ,[koi_image_url]
      ,[koi_color]
      ,[Species_Name]
      ,[koi_quantity]
      ,[koi_description]
  FROM [KOI_FARM_SHOP].[dbo].[Kois] 
  INNER JOIN Species ON Kois.koi_species_ID = Species.Species_ID`
    return result.recordset
  }

  async getProducById(id) {
    const result = await sql.query`SELECT 
      [koi_id]
      ,[koi_name]
      ,[koi_gender]
      ,[koi_age]
      ,[koi_size]
      ,[koi_price]
      ,[koi_image_url]
      ,[koi_color]
      ,[Species_Name]
      ,[koi_quantity]
      ,[koi_description]
  FROM [KOI_FARM_SHOP].[dbo].[Kois] 
  INNER JOIN Species ON Kois.koi_species_ID = Species.Species_ID
  WHERE koi_id = ${id}`

    return result.recordset[0]
  }

  // async createProduct() {
    
  // }
}

module.exports = new ProductRepository()
