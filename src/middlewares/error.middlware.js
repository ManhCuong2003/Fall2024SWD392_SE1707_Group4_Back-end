const defaultErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  res.status(statusCode).json({
    error: {
      message: err.message || 'Internal Server Error'
    }
  })
}

module.exports = defaultErrorHandler
