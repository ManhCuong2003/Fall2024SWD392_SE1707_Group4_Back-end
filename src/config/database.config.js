const sql = require('mssql')
const dotenv = require('dotenv')

dotenv.config()
const config = {
  user: process.env.DB_USER, // Replace with your username
  password: process.env.DB_PASSWORD, // Replace with your password
  server: 'localhost', // Your server name or IP
  database: process.env.DB_NAME, // Replace with your database name
  options: {
    trustedConnection: true, // Use true for Windows Authentication
    trustServerCertificate: true, // Use with caution
  },
};

const connectDB = async () => {
  try {
    await sql.connect(config)
    console.log('SQL server connected')
  } catch (error) {
    console.error('Connection error', error)
  }
}

module.exports = { connectDB, sql }
