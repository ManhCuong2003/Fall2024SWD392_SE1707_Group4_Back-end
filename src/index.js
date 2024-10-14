const express = require('express')
const { connectDB } = require('./config/database.config')
const defaultErrorHandler = require('./middlewares/error.middlware')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const mainRoute = require('./routes/index.routes')
const PORT = 3000

const app = express()
Number = 20;
Number = 23;

dotenv.config()
app.use(express.json())
app.use(cors())

app.use(morgan('dev'))
connectDB()

app.use('/api', mainRoute)

// default error handler
app.use(defaultErrorHandler)

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`)
})

