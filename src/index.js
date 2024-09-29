const express = require('express')
const { connectDB } = require('./config/database.config')
const userRoute = require('./routes/user.routes')
const defaultErrorHandler = require('./middlewares/error.middlware')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const PORT = 3000

const app = express()

dotenv.config()
app.use(express.json())
app.use(cors())

app.use(morgan('dev'))
connectDB()

app.use('/users', userRoute)

// default error handler
app.use(defaultErrorHandler)

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`)
})
