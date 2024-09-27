const sql = require('mssql/msnodesqlv8')

const config = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  server: 'localhost',
  port: 1433,
  database: process.env.DB_NAME
}

const connectDB = async () => {
  try {
    await sql.connect(config)
    console.log('SQL server connected')
  } catch (error) {
    console.error('Connection error', err)
  }
}

module.exports = { connectDB, sql }
