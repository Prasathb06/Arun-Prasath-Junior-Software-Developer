const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.message)

  const status = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message)
    return res.status(400).json({ success: false, message: errors.join(', ') })
  }

  if (err.code === 11000) {
    return res.status(400).json({ success: false, message: 'Duplicate field value entered.' })
  }

  res.status(status).json({ success: false, message })
}

module.exports = errorHandler
