const { query } = require('mssql')
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

  async createProduct({
    koi_name,
    koi_gender,
    koi_age,
    koi_size,
    koi_price,
    koi_image_url,
    koi_color,
    Species_ID,
    koi_quantity,
    koi_description
  }) {
    try {
      const result = await sql.query`
      INSERT INTO Kois (
        [koi_name],
        [koi_gender],
        [koi_age],
        [koi_size],
        [koi_price],
        [koi_image_url],
        [koi_color],
        [koi_species_ID],
        [koi_quantity],
        [koi_description]
      )
      VALUES (
      ${koi_name},
      ${koi_gender},
      ${koi_age},
      ${koi_size},
      ${koi_price},
      ${koi_image_url},
      ${koi_color},
      ${Species_ID},
      ${koi_quantity},
      ${koi_description}
      )`
      return result.recordset[0]
    } catch (error) {
      console.log(error)
    }
    
  }
  
  async updateProduct({
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
  }) {
    try {
        const result = await sql.query`
      UPDATE Kois
      SET [koi_name] = ${koi_name}
        ,[koi_gender] = ${koi_gender} 
        ,[koi_age] = ${koi_age}
        ,[koi_size] = ${koi_size}
        ,[koi_price] = ${koi_price}
        ,[koi_image_url] = ${koi_image_url}
        ,[koi_color] = ${koi_color}
        ,[koi_species_ID] = ${Species_ID}
        ,[koi_quantity] = ${koi_quantity}
        ,[koi_description] = ${koi_description}
        ,[koi_status] = ${koi_status}
        ,[koi_alive] = ${koi_alive}
      WHERE [koi_id] = ${koi_id}
      `
      return result.recordset[0]
    } catch (error) {
      console.log(error);
    }
    
  }

  async deleteProduct(id)
  {
    try{
      const result = await sql.query`
      DELETE FROM Kois
      WHERE koi_id = ${koi_id}
      `
      return result.recordset[0]

    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ProductRepository()