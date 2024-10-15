const sql = require('mssql/msnodesqlv8')
const dotenv = require('dotenv')

dotenv.config()
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: 'localhost\\MSSQLSERVER01',
  port: 1433,
  database: process.env.DB_NAME
}

const connectDB = async () => {
  try {
    await sql.connect(config)
    console.log('SQL server connected')
  } catch (error) {
    console.error('Connection error', error)
  }
}

module.exports = { connectDB, sql }
