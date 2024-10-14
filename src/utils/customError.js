class CustomError extends Error {
  constructor(statusCode, message) {
    super(message)
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.contructor)
  }
}

module.exports = CustomError
